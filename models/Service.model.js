const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Required field'],
        trim: true,
        lowercase: true,
      },
  });
  
  const Service = mongoose.model('Service', serviceSchema);
  module.exports = Service;

