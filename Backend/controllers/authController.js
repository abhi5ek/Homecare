const User = require('../models/userModel');
const Guide = require('../models/guideModel');
const Role = require('../models/roleModel');
const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const validator = require('validator'); // Added validator import


//to Create user
const register = async (req, res, next) => {
  try {
    // Extract the necessary fields from the request body
    const { email, password, name, mobileNumber } = req.body;

    // Email validation
    if (!validator.isEmail(email)) {
     
    }

    // Password validation
    if (password.length < 8) {
      return next(createError(400, "Password must be at least 8 characters long"));
    }

    // Name validation
    if (name.length <= 1 || name.length >= 25) {
      return next(createError(400, "Name must be between 2 to 25 characters long"));
    }

    // Mobile number validation
    // if (!mobileNumber.startsWith('+1') || mobileNumber.length !== 12 || isNaN(mobileNumber.slice(2))) {
    //   return next(createError(400, "Invalid mobile number format. Must start with +1 followed by 10 digits."));
    // }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        status: 500,
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      role: "user",
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return res.status(200).json({
      status: 200,
      message: "User SignUp Successful!",
      success: true,
      user: newUser,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error in register:', error);
    return next(createError(500, "Something went wrong"));
  }
};


//to login
const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User Not Found"
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: "Password is Incorrect"
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "Login Success",
        token,
        data: user
      });

  } catch (error) {
    console.error("Login error:", error);
    return next(createError(500, "Something went wrong"));
  }
};


//to login of Guide
// const loginGuide = async (req, res, next) => {
//   try {
//     let user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({
//         status: 404,
//         message: "User Not Found"
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         status: 401,
//         message: "Password is Incorrect"
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin, roles: user.roles },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json({
//         status: 200,
//         message: "Login Success",
//         token,
//         data: user
//       });

//   } catch (error) {
//     console.error("Login error:", error);
//     return next(createError(500, "Something went wrong"));
//   }
// };



//Register Admin
const registerAdmin = async (req, res, next) => {
  try {
    if (!validator.isEmail(req.body.email)) { // Email validation
      return next(createError(400, "Invalid email format"));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing password

    const newUser = new User({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: true,
      roles: "Admin"
    });

    await newUser.save();
    return next(createSuccess(200, "Admin Registered Successfully"));
  } catch (error) {
    console.error('Error in registerAdmin:', error);
    return next(createError(500, "Something went wrong"));
  }
};

// this is the admin login
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    // Constant credentials (for demonstration purposes)
    const adminEmail = 'homecare@gmail.com';
    const adminPassword = 'homecare123'; // make sure this is a hashed password

    if (email !== adminEmail) {
      return next(createError(401, "Authentication failed. Invalid email or password."));
    }

    const isMatch = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 8));
    if (!isMatch) {
      return next(createError(401, "Authentication failed. Invalid email or password."));
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    if (!jwtSecret) {
      return next(createError(500, "Internal Server Error: JWT secret is not defined"));
    }

    const token = jwt.sign({ roles: "admin" }, jwtSecret, { expiresIn: '1h' });

    // Set the token in a HTTP-only cookie for secure storage
    res.cookie("admin_token", token, {
      httpOnly: true, // Cookie is accessible only by the server
      // secure: process.env.NODE_ENV === "production", // Use secure cookie in production
      maxAge: 3600000, // Expiry time in milliseconds (1 hour)
      // domain: "yourdomain.com" // Optionally, specify the domain
    });

    // Respond with a success message and status 200
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Admin authentication successful",
      token: token
    });

  } catch (error) {
    console.error('Error in loginAdmin:', error);
    return next(createError(500, "Internal Server Error"));
  }
};


//sendresetmail
const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  try {

    if (!validator.isEmail(email)) { // Email validation
      return res.status(400).json({ message: "Invalid email format" });
    }

    let guide = [];
    let user = await User.findOne({ email });
    let userType = "user";
    if (!user) {
      guide = await Guide.findOne({ email });
      userType = "guide";
    }

    if (!user && !guide) {
      return next(createError(401, "Invalid Email"));
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    if (userType == "user") {
      user.otp = otp;
      user.otpExpiration = Date.now() + 15 * 60 * 1000;
      await user.save();
    } else {
      guide.otp = otp;
      guide.otpExpiration = Date.now() + 15 * 60 * 1000;
      await guide.save();
    }

    const ResetPasswordLink = `http://localhost:5007/resetPassword?token=${otp}`;

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
      <p><a href="${ResetPasswordLink}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>`
    };

    // await mailTransporter.sendMail(mailDetails);
    mailTransporter.sendMail(mailDetails);
    // return next(createSuccess(200, "OTP sent to your mail", mailDetails));
    return next(createSuccess(200, "OTP sent to your mail", ));
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).send("Internal Server Error");
  }
};

const verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  try {
    let guide = [];
    let user = await User.findOne({ otp, otpExpiration: { $gt: Date.now() } });
    let userType = "user";
    if (!user) {
      guide = await Guide.findOne({ otp, otpExpiration: { $gt: Date.now() } });
      userType = "guide";
    }

    if (!user && !guide) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (userType == "user") {
      user.otp = undefined;
      user.otpExpiration = undefined;
      await user.save();
    } else {
      guide.otp = undefined;
      guide.otpExpiration = undefined;
      await guide.save();
    }

    const email = user ? user.email : guide.email;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    return next(createSuccess(200, "OTP Verified successfully!", token));
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return next(createError(500, "Internal Server Error"));
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  console.log({ token });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;
    let guide = null;
    let user = await User.findOne({ email: userEmail });
    let userType = "user";

    if (!user) {
      guide = await Guide.findOne({ email: userEmail });
      userType = "guide";
    }

    if (!user && !guide) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    if (userType === "user") {
      user.password = hashedPassword;
      await user.save();
    } else {
      guide.password = hashedPassword;
      await guide.save();
    }

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



// in logout reset the token 
// Logout method
const logout = async (req, res, next) => {
  try {
    // Clear session-related data (e.g., tokens, cookies)
    // Remove token from user's tokens array (if applicable)
    res.clearCookie('token'); // Clear access_token cookie
    return next(createSuccess(200, "Logged out Succeessfully!"));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  registerAdmin,
  loginAdmin,
  sendEmail,
  resetPassword,
  verifyOTP,
  logout
}