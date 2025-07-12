const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  photos: [{ type: String }],
  description: { type: String },
});

module.exports = mongoose.model('Event', eventSchema); 