const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  clientId:{ type: String, required: false}, 
  clientName: String,
  dob: Date,
  address: String,
  city: String,
  fl: String,
  tel: String,
  emergencyContact: String,
  emergencyTel: String,
  healthProblems: String,
  serviceTime: String,
  frequency: {
    sunday: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
  },
  dnro: {
    type: String,
    enum: ['yes', 'no'],
  }
});

module.exports = mongoose.model('Service', serviceSchema);