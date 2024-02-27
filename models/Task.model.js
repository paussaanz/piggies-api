const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Required field'],
      lowercase: true,
    },
    status: {
        type: Boolean,
        required: [true, 'Required field'],
        default: false
    },
      date: {
        type: String,
        lowercase: true,
      },
});

const Task = mongoose.model('Task', taskSchema);
