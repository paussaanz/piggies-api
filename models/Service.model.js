const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Required field'],
        trim: true,
        lowercase: true,
      },
      description:{
        type: String,
        required: true,
        trim:true
      },
      number: {
        type: String,
        required: true
      },
      imgUrl:{
        type:String,
        required: [true, 'Required field'],
        trim: true,
        lowercase: true
      },
      categories: {
        type: [String],
        required: [true, 'Required field'],
        trim: true,
        lowercase: true
      },
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  });
  
  serviceSchema.virtual('tasks', {
    ref: 'Task',
    foreignField: 'serviceId',
    localField: '_id',
    justOne: false
  })

  const Service = mongoose.model('Service', serviceSchema);
  module.exports = Service;

