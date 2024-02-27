const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Required field'],
        trim: true,
        lowercase: true,
      },
      tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }]
  });
  
  const Service = mongoose.model('Service', serviceSchema);
