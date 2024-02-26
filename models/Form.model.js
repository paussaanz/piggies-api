const mongoose = require('mongoose');
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SERVICES = ['Communication', 'Planning', 'Marketing', 'Social Media', 'Branding']

const formSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Required field'],
    trim: true 
},
  email: {
    type: String,
    unique: true,
    required: [true, 'Required field'],
    match: [EMAIL_REGEX, 'Add a valid email'],
    trim: true,
    lowercase: true
},
  phone: {
    type: String,
    unique: true,
    required: [true, 'Required field'],
    trim: true,
    minlength: [9, "invalid length"]
},
  subject:{
    type: String,
    unique: true,
    required: [true, 'Required field'],
    trim: true,
},
  message: {
    type: String,
    unique: true,
    required: [true, 'Required field'],
    trim: true,
},
service:{
  type: [String],
  required: true,
  enum: SERVICES
}
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form