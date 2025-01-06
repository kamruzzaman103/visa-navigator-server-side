const mongoose = require('mongoose');

const visaApplicationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  countryImage: { type: String, required: true },
  visaType: { type: String, required: true },
  processingTime: { type: String, required: true },
  validity: { type: String, required: true },
  applicationMethod: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  applicantName: { type: String}, // Firstname Lastname
  email: { type: String, required: true },
  appliedDate: { type: Date, required: true },
  fee: { type: Number, required: true },
  visaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visa', required: true },
});

const VisaApplication = mongoose.model('VisaApplication', visaApplicationSchema);

module.exports = VisaApplication;
