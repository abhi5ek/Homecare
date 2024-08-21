const Client = require('../models/clientModel')
const Guide = require('../models/guideModel')
const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')


const addClient = async(req, res, next) => {
  try{

  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);

  const {name, mobileNumber, email, address, age, medicalhistory, password, role, assigned, assignStatus, workerid} = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newClient = new Client({
      name: name,
      mobileNumber:mobileNumber,
      email:email,
      address:address,
      age:age,
      medicalhistory:medicalhistory,
      password:password,
      role:role,
      assigned:assigned,
      assignStatus:assignStatus,
      workerid:workerid,
      image:image
  });

  await newClient.save();

  return res.status(200).json({
    status: 200,
    message: "Client SignUp Successful!",
    success: true,
    data: newClient
  });

  }catch(error){
    return next(createError(500, "Something went wrong"));
  }
};


const reassign = async(req, res, next) => {
  try{
    const {id} = req.params;
    console.log('id',id)
    const client = await Client.findById(id);
    const workerid = client.workerid;
    client.workerid='';
    client.assigned='ASSIGN';
    client.assignStatus='NOT ASSIGNED';
    await client.save();

    const guide = await Guide.findById(workerid);
    guide.modelclientid = guide.modelclientid.filter(clientId => clientId !== id);
    guide.workStatus = guide.workStatus.map(status => {
      if (status.clientId === id) {
        status.isDeleted = true; // Mark the work status as deleted
      }
      return status;
    });

    await guide.save();
    res.status(200).json({
      status: 200,
      message: "ASSIGNED WORKER REMOVED",
      data: {
        guide, client
      }
    });
  } catch (error) {
    console.error('Error updating Client and Guide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// const removeworker = async(req, res, next) => {
//   const { id } = req.params;
//   const client = await Client.findById(id);
//   const workerid = client.data.data.workerid;
//   client.workerid='';
//   await client.save();

//   const guide = 



// }

const getallclient = async(req, res, next) => {
    try {
        const client = await Client.find();
        return next(createSuccess(200, "Get all Assessment ", client));

    } catch (error) {
        return next(createError(500, "Internal Server Error!"))
    }
}

const deleteClient = async(req,res,next)=> {
    try {
        const { id } = req.params;
        // const workerid  = req.body.workerid.id;
        const client = await Client.findByIdAndDelete(id);
        if (!client) {
          return next(createError(404, "User Not Found"));
        }
        res.status(200).json({
          status: 200,
          message: "User Deleted",
          data: client
        });
      } catch (error) {
        return next(createError(500, "Internal Server Error"));
      }
}
const getClientbyid = async(req,res,next)=> {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);
        // client.status = "Assigned";
        if (!client) {
          return next(createError(404, "User Not Found"));
        }
        res.status(200).json({
          status: 200,
        //   message: "User Deleted"
          data: client
        });
      } catch (error) {
        return next(createError(500, "Internal Server Error"));
      }
}

const getworkersid = async(req,res,next)=> {
  try{
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return next(createError(404, "User Not Found"));
    }
    res.status(200).json({
      status: 200,
    //   message: "User Deleted"
      data: client
    });
  }catch (error){
    return next(createError(500, "Internal Server Error"));
  }
}

const editClient = async(req,res,next) => {
    try {
        const { id } = req.params;
        const client = await Client.findByIdAndUpdate(id, req.body, { new: true });
        if (!client) {
          return next(createError(404, "User Not Found"));
        }
        res.status(200).json({
          status: 200,
          message: "User Details Updated",
          data: client
        });
      } catch (error) {
        return next(createError(500, "Internal Server Error!"));
      }

}

module.exports = {
    addClient,
    getallclient,
    deleteClient,
    editClient,
    getClientbyid,
    getworkersid,
    reassign
}