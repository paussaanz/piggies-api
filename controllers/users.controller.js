const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  const userToCreate = {
    ...req.body,
  }

  if (req.file) {
    userToCreate.imageUrl = req.file.path;
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
    } else {
      return User.create(userToCreate)
        .then(userCreated => {
          res.status(StatusCodes.CREATED).json(userCreated)
        })
      }
    })
  .catch(next)

};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};