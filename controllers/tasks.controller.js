const Task = require("../models/Task.model");

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("serviceId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.getDoneTasks = async (req, res, next) => {
    try {
        const doneTasks = await Task.find({status:true}).populate("serviceId");
        res.status(200).json(doneTasks);
    } catch (error) {
        next(error);
    }
};

module.exports.getPendingTasks = async (req, res, next) => {
    try {
        const pendingTasks = await Task.find({status:false}).populate("serviceId");
        res.status(200).json(pendingTasks);
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

module.exports.updateTask = async (req, res, next) => {
    try {
        const { taskId, status } = req.params;
        const task = await Task.findByIdAndUpdate(
            taskId,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};
