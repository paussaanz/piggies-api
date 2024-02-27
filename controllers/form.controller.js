const Form = require("../models/Form.model");
const Task = require("../models/Task.model")
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    Form.create(req.body)
        .then(createdForm => {
            res.status(StatusCodes.CREATED).json(createdForm);
        })
        .catch(next)
}



module.exports.dashboard = (req, res, next) => {
    Form.find()
        .then(dbForms => {
            res.status(StatusCodes.OK).json(dbForms);
        })
        .catch(next)
}
