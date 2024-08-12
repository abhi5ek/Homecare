const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Assuming name is required
  },
  mobileNumber: {
    type: Number,
    required: true // Assuming mobileNumber is required
  },
  email: {
    type: String,
    required: true // Assuming email is required
  },
  image: {
    type: String,
    required: false // Assuming email is required
  },
  address: {
    type: String,
    required: true // Assuming address is required
  },
  age: {
    type: String,
    required: true // Assuming age is required
  },
  medicalhistory: {
    type: String,
    default: 'None' // Assuming medicalhistory defaults to 'None'
  },
  password: {
    type: String,
    required: true // Assuming password is required
  },
  role: {
    type: String,
    default: 'user' // Assuming role defaults to 'user'
  },
  assigned: {
    type: String,
    default:"ASSIGN",
    required:true// Assuming role defaults to 'user'
  },
  assignStatus: {
    type: String,
    default:"NOT ASSIGNED",
    required:true// Assuming role defaults to 'user'
  },
  signature: {
    type: String,
    required: false
  },
  workerid: {
    type: String,
    default: 0,
    required: false // Assuming role defaults to 'user'
  }
});

module.exports = mongoose.model('Client', clientSchema);