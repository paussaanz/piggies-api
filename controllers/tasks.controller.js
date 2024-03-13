const Task = require("../models/Task.model");
const User = require("../models/User.model");
const {
    transporter,
    createEmailTemplate,
} = require('../config/nodemailer.config');

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("userId");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

module.exports.addUsersToTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { userId: req.body });
        res.json(task)
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
        console.log('task', task)

         task.userId.forEach((user) => {
            console.log("Entro")
            transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: user.email,
                subject: `Your task ${task.name} was updated`,
                html: createEmailTemplate({ name: 'Paula', message : 'sosa' }),
            })
                .then(info => {
                    console.log('Email sent: ' + info.response);
                })
                .catch(emailError => {
                    console.error('Error sending email:', emailError);
                    throw emailError;
                });

        })


        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
};

exports.editTask = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error)
    }
};

