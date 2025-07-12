const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  // wanna add name and contact details
  // name: String,
  // email: String,
  // phone: String,
  amount: Number,
  paymentId: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema); 