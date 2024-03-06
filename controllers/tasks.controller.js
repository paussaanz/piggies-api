const Task = require("../models/Task.model");

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("serviceId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.getTasksByForm = async (req, res, next) => {
    try {
        const { formId } = req.params;
        const tasks = await Task.find({ formId }).populate("serviceId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.getTasksByService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const tasks = await Task.find({ serviceId })
            .populate("formId")
            .populate("serviceId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;

    try {
      const task = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true });
  
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).send({ message: error.message || 'Error updating task status' });
    }
  };