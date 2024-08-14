const Guide = require('../models/guideModel');
const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const validator = require('validator');

//to Create guide
const register = async (req, res, next) => {
  try {
    // Extract the necessary fields from the request body
    const { email, password, name, mobileNumber,address, role, age} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      return next(createError(400, "Image is required"));
  }

    // Email validation
    if (!validator.isEmail(email)) {
      return next(createError(400, "Invalid email format"));
    }

    // Name validation
    if (name.length <= 1 || name.length >= 25) {
      return next(createError(400, "Name must be between 2 to 25 characters long"));
    }

    // Mobile number validation
    // if (!/^\d{10}$/.test(mobile)) {
    //   return next(createError(400, "Invalid mobile number format"));
    // }

    // Check if the guide already exists
    const existingGuide = await Guide.findOne({ email: email });
    if (existingGuide) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new guide
    const newGuide = new Guide({
      name: name,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      address: address,
      role: role,
      age: age,
      image: image
    });

    // Save the new guide to the database
    await newGuide.save();

    // Send success response
    return res.status(200).json({
      status: 200,
      message: "User SignUp Successful!",
      success: true,
      data: newGuide
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return next(createError(500, "Something went wrong"));
  }
};




const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    // Check if the email and password are provided
    if (!email || !password) {
      console.log("Email or password missing");
      return res.status(400).json({
        message: "Email and password are required",
        status: 400
      });
    }

    const guide = await Guide.findOne({ email });
    if (!guide) {
      console.log("User not found for email:", email);
      return res.status(401).json({
        message: "Authentication failed. Invalid email or password.",
        status: 401
      });
    }

    const isMatch = await bcrypt.compare(password, guide.password);
    if (!isMatch) {
      console.log("Invalid password for email:", email);
      return res.status(401).json({
        message: "Authentication failed. Invalid email or password.",
        status: 401
      });
    }

    // Ensure you have a JWT secret defined in your environment variables or config
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    if (!jwtSecret) {
      console.log("JWT secret is not defined");
      return res.status(500).json({
        message: "Internal Server Error: JWT secret is not defined",
        status: 500
      });
    }

    const token = jwt.sign({ id: guide._id }, jwtSecret, { expiresIn: '1h' });
    console.log("Token generated for email:", email);

    return res.status(200).json({
      message: "Authentication successful",
      status: 200,
      token
    });
  } catch (error) {
    console.error('Error in loginGuide:', error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500
    });
  }
};





const sendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const guide = await Guide.findOne({ email });

    if (!guide) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    guide.otp = otp;
    guide.otpExpiration = Date.now() + 15 * 60 * 1000; // 15 minutes
    await guide.save();

    const resetPasswordLink = `http://13.200.240.28:3001/reset-password?token=${otp}`;

    const mailTransporter = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This OTP is valid for 15 minutes.</p>
      <p><a href="${resetPasswordLink}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>`
    };

    await mailTransporter.sendMail(mailDetails);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  try {
    const guide = await Guide.findOne({ otp, otpExpiration: { $gt: Date.now() } });

    if (!guide) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    guide.otp = undefined;
    guide.otpExpiration = undefined;
    await guide.save();

    const token = jwt.sign({ email: guide.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;
    const guide = await Guide.findOne({ email: userEmail });

    if (!guide) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    guide.password = hashedPassword;
    await guide.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports = {
//   sendEmail,
//   verifyOTP,
//   resetPassword
// };

//get all guide
const getAllGuides = async (req, res, next) => {
  try {
    const guides = await Guide.find();
    res.status(200).json({
      status: 200,
      message: "All Guides",
      data: guides
    });
  } catch (error) {
    return next(createError(500, "Internal Server Error!"));
  }
};

//get guide
const getGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "Single User",
      data: guide
    });
  } catch (error) {
    return next(createError(500, "Internal Server Error!"));
  }
};

const editGuide = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mobileNumber: req.body.mobileNumber,
          role: req.body.role,
          age: req.body.age,
          address: req.body.address
      };

      const updatedUser = await Guide.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
      next(error);
  }
};

const updateGuide = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modelclientid=req.body.modelclientid;
    // const assign=req.body.payload.b;
    const guide = await Guide.findByIdAndUpdate(id,{ $push: { modelclientid }});
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "User Details Updated",
      data: guide
    });
  } catch (error) {
    return next(createError(500, "Internal Server Error!"));
  }
};

const workStatus = async (req, res, next) => {
  try{
    const { id } = req.params;
    // const clientId=req.body.clientId;
    const {workStatus}=req.body;
    // const workStatus={
    //   clientId,status
    // }
    console.log("workstatus",workStatus);
    const guide = await Guide.findByIdAndUpdate(id,{$push:{workStatus}});
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "User Details Updated",
      data: guide
    });
  } catch (error){
    return next(createError(500, "Internal Server Error!"));
  }
};

const deleteStatus = async (req, res, next) => {
  try{
    const { id } = req.params;
    // const clientId=req.body.clientId;
    const {workStatus}=req.body;
    const guide = await Guide.findByIdAndUpdate(id,{workStatus});
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "User Details Updated",
      data: guide
    });
  } catch (error){
    return next(createError(500, "Internal Server Error!"));
  }

}
const updateworkstatus = async (req, res, next) => {
  try {
    const { id, workStatusId } = req.params; // Guide ID and workStatus ID
    const { status } = req.body; // New status from the request body

    // Update the specific workStatus entry
    const guide = await Guide.findOneAndUpdate(
      { _id: id, 'workStatus._id': workStatusId }, // Match guide ID and specific workStatus entry by workStatus ID
      { $set: { 'workStatus.$.status': status } }, // Update the status field of the matched entry
      { new: true } // Return the updated document
    );

    if (!guide) {
      return next(createError(404, "Guide Not Found"));
    }

    res.status(200).json({
      status: 200,
      message: "Work Status Updated",
      data: guide
    });
  } catch (error){
    return next(createError(500, "Internal Server Error!"));
  }
};

const updateWorker = async (req, res, next) => {
  try{
    const { id } = req.params;
    const {modelclientid}=req.body;
    // const updatemodelclientid = modelclientid.filter(clientid => clientid !==id);
    const guide = await Guide.findByIdAndUpdate(id,{modelclientid});
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "User Details Updated",
      data: guide
    });
  }catch(error){
    return next(createError(500, "Internal Server Error!"));
  }
}


//delete guide
const deleteGuide = async (req, res, next) => {
  try {
    const { id } = req.params;
    const guide = await Guide.findByIdAndDelete(id);
    if (!guide) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
      message: "User Deleted",
      data: guide
    });
  } catch (error) {
    return next(createError(500, "Internal Server Error",error.message));
  }
};


// forget password
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find guide by email
    const guide = await Guide.findOne({ email });
    if (!guide) return res.status(404).send('Guide not found');

    // Generate reset token
    const resetToken = jwt.sign({ guideId: guide._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token and expiration to guide
    guide.resetToken = resetToken;
    guide.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await guide.save();

    // Create reset password link
    const resetPasswordLink = `http://${req.headers.host}/reset-password/${resetToken}`;

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      to: guide.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      html: `
          <p>You requested a password reset. Click the link below to reset your password. The link is valid for 1 hour.</p>
          <p><a href="${resetPasswordLink}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('Password reset email sent');
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Server error');
  }
};

const resetPasswordGuide = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const guide = await Guide.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!guide) return res.status(400).send('Invalid or expired token');

    guide.password = await bcrypt.hash(newPassword, 12); // Hash the new password
    guide.resetToken = undefined;
    guide.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).send('Password reset successful');
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Server error');
  }
};


module.exports = {login,editGuide,sendEmail,updateWorker,deleteStatus,updateworkstatus, resetPassword, verifyOTP, register, getGuide, getAllGuides, updateGuide, forgetPassword, deleteGuide, resetPasswordGuide, workStatus }