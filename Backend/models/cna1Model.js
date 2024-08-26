const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cna1Schema = new Schema({
    clientId:{ type: String, required: false}, 
    patientName: { type: String, required: true },
    gender: { type: String, required: true },
    mrNumber: { type: String, required: true },
    date: { type: Date, required: true },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String, required: true },
    pcpName: { type: String, required: true },
    otherPhysicianName: { type: String, required: true }
});

module.exports = mongoose.model('Cna1', Cna1Schema);
