const Form = require("../models/Form.model");
const Task = require("../models/Task.model")
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.createForm = (req, res, next) => {
    Form.create(req.body)
    .then((createdForm) => {
      const taskPromises = createdForm.service.map((service, index) => {
        return Task.create({
          name: `Task ${index + 1} from ${createdForm.name}`,
          formId: createdForm._id,
          serviceId: service,
        });
      });

      return Promise.all(taskPromises).then((createdTasks) => {
        res.status(StatusCodes.CREATED).json(createdTasks);
      });
    })
    .catch(next);
};



module.exports.getForms = (req, res, next) => {
    Form.find()
        .then(dbForms => {
            res.status(StatusCodes.OK).json(dbForms);
        })
        .catch(next)
}
