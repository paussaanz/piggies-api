const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
    ref: 'User',
  },
  to: {
    type: String,
    required: true,
    ref: 'User',
  },
  room: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;


//   room: String,
//   content: String,
//   from: String,
//   to: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

