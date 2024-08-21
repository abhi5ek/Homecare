const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workStatusSchema = new Schema({
    client: {
      type: String,
      required: false
    },
    clientName: {
      type: String,
      required: false
    },
    clientId: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    }
  });
const AssessmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        mobileNumber: {
            type: Number,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        address:{
            type: String,
            required: false,
        },
        age:{
            type: String,
            required: false,
        },
        medicalhistory:{
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false
        },
        image: {
            type: String, // Storing image URL
            required: false
        },
        assign:{
            type: String,
            required: false,
            default: 'NOT ASSIGNED'
        },   
        profileImage: {
            type: String,
            required: false
        },
        modelclientid: {
            type:[String],
            required: false
        },
        workStatus: [workStatusSchema],
    },
    {
        timestamps: true
    }
);
 
module.exports = mongoose.model('Assessment', AssessmentSchema);