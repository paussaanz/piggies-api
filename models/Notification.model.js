const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
      },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    message: {
        type: String,

    },
    added:{
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    },
    
},
{
    timestamps: true 
  });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;