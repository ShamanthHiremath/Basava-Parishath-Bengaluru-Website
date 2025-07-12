const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Team member position is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Team member image is required']
  },
  description: {
    type: String,
    required: [true, 'Team member description is required'],
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field before saving
teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;