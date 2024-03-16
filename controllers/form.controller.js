const Form = require("../models/Form.model");
const Task = require("../models/Task.model")
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const {
  transporter,
  createdFormEmailTemplate,
  contactClientEmailTemplate
} = require('../config/nodemailer.config');
const moment = require('moment');

module.exports.createForm = (req, res, next) => {
  Form.create(req.body)
    .then((createdForm) => {
      return transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: req.body.email,
        subject: 'Your form was created succesfully!',
        html: createdFormEmailTemplate(createdForm),
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
    .then(acceptedForm => {
      res.json(acceptedForm);
    })
    .catch(next);
};

module.exports.doCompleteForm = (req, res, next) => {
  const { id } = req.params;
  Form.findByIdAndUpdate(id, { completed: true }, { new: true })
    .then(completedForm => {
      res.json(completedForm);
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
    .populate("service")
    .populate({
      path: 'tasks',
      populate: {
        path: 'userId serviceId'
      }
    })
    .then(dbForms => {
      res.status(StatusCodes.OK).json(dbForms);
    })
    
    .catch(next)
}

module.exports.contactClient = (req, res) => {
  const { message } = req.body;
  const { id } = req.params;

  Form.findById(id).then(form => {
    if (!form) {
      throw new Error('Form not found');
    }

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: form.email,
      subject: 'We are trying to contact you',
      html: contactClientEmailTemplate(message, form), // Aquí tengo que meter el template de mailing de contacto
    };
    return transporter.sendMail(mailOptions);
  })
  .then(info => {
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true });
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ success: false });
  });
};
