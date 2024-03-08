const Form = require("../models/Form.model");
const Task = require("../models/Task.model")
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const {
  transporter,
  createEmailTemplate,
} = require('../config/nodemailer.config');

module.exports.createForm = (req, res, next) => {
  Form.create(req.body)
    .then((createdForm) => {
      return transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: req.body.email,
        subject: 'Your form was created succesfully!',
        html: createEmailTemplate(createdForm),
      })
        .then(info => {
          console.log('Email sent: ' + info.response);
          const taskPromises = createdForm.service.map((service, index) => {
            return Task.create({
              name: `Task ${index + 1} from ${createdForm.name}`,
              formId: createdForm._id,
              serviceId: service,
            });
          });
          return Promise.all(taskPromises);
        })
        .catch(emailError => {
          console.error('Error sending email:', emailError);
          throw emailError;
        });
    })
    .then(createdTasks => {
      res.status(StatusCodes.CREATED).json(createdTasks);
    })
    .catch(next);
};


module.exports.doAcceptForm = (req, res, next) => {
  const { id } = req.params;
  Form.findByIdAndUpdate(id, { accepted: true }, { new: true })
    .then(updatedForm => {
      res.json(updatedForm);
    })
    .catch(next);
};

module.exports.acceptedFormsTasks = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form.accepted) {
      return res.status(400).json({ message: "Formulario no aceptado" })
    }
    const tasks = await Task.find({ formId: req.params.id });
    res.json(tasks)
  } catch (error) {
    res.status(500).send(error)
  }

}


module.exports.getForms = (req, res, next) => {
  const { accepted } = req.query
  let searchQuery = {}

  if (accepted) {
    searchQuery.accepted = true
  }

  Form.find(searchQuery)
    // .populate('service')
    .populate('tasks')
    .then(dbForms => {
      res.status(StatusCodes.OK).json(dbForms);
    })
    .catch(next)
}


