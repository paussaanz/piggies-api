const mongoose = require('mongoose');
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Required field'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Required field'],
    match: [EMAIL_REGEX, 'Add a valid email'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Required field'],
    trim: true,
    minlength: [9, "invalid length"]
  },
  subject: {
    type: String,
    required: [true, 'Required field'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Required field'],
    trim: true,
  },
  service: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    }
  ],
  accepted:
  {
    type: Boolean,
    required: true,
    default: false
  },
  rejected:
  {
    type: Boolean,
    required: true,
    default: false
  },
  completed:
  {
    type: Boolean,
    required: true,
    default: false
  }
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Sirve para cambiar el output de los endpoints cuando hago res.json

        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

formSchema.virtual('tasks', {
  foreignField: 'formId',
  localField: '_id',
  ref: 'Task',
  justOne: false
})


const Form = mongoose.model('Form', formSchema);
module.exports = Form