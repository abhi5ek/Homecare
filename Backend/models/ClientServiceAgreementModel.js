const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientServiceAgreementSchema = new Schema({
  clientId: {type: String, required: false},
  clientName: { type: String, required: true },
  clientAddress: { type: String, required: true },
  initials: { type: String, required: true },
  insuranceProvider: { type: String, required: true },
  clientSignature: { type: String, required: true },
  clientDate: { type: Date, required: true },
  financialSignature: { type: String, required: true },
  financialDate: { type: Date, required: true },
  representativeSignature: { type: String, required: true },
  representativeDate: { type: Date, required: true },
});

const ClientServiceAgreement = mongoose.model('ClientServiceAgreement', clientServiceAgreementSchema);
module.exports = ClientServiceAgreement;