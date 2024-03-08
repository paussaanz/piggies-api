const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  name: {
    type: String,
    required: [true, "Required field"],
    lowercase: true,
  },
  status: {
    type: Boolean,
    required: [true, "Required field"],
    default: false,
  },
  date: {
    type: Boolean,
    lowercase: true,
    default: false
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
