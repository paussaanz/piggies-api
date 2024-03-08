const Task = require("../models/Task.model");
const User = require("../models/User.model");

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("userId");
        console.log("populatedTasksssss", tasks)
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.addUserToTask = async (req, res) => {
    const { userId, taskId } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { $push: { userId } }, { new: true }).populate("userId")
        res.status(200).json(task)
    }
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occurred while adding task to user' });
    }
};

module.exports.getTasksByForm = async (req, res, next) => {
    try {
        const { formId } = req.params;
        const tasks = await Task.find({ formId }).populate("userId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.getTasksByService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const tasks = await Task.find({ serviceId })
            .populate("userId")
            .populate("formId")
            .populate("serviceId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true })
            .populate("userId");

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
};

// exports.updateTaskStatus = async (req, res, next) => {
//     const { taskId } = req.params;

//     try {
//         const task = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true });
//         const populatedTask = await Task.findById(task._id).populate('userId');
//         if (!task) {
//             return res.status(404).send({ message: 'Task not found' });
//         }

//         res.status(200).json(populatedTask);
//     } catch (error) {
//         next(error);
//     }
// };


exports.editTask = async (req, res, next) => {
    const { taskId } = req.params;
    //COMM: TENGO QUE CAMBIAR EL SET
    try {
        const task = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true })

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
};