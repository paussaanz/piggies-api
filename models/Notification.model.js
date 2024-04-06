const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;