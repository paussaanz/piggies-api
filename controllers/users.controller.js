const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const ROUNDS = 10;


module.exports.createUser = (req, res, next) => {
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

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const userToUpdate = {
    ...req.body,
  }

  if (req.file) {
    userToUpdate.imageUrl = req.file.path;
  }
  if (userToUpdate.password) {
    bcrypt.hash(userToUpdate.password, ROUNDS)
      .then(hash => {
        userToUpdate.password = hash;
        return User.findByIdAndUpdate(id, userToUpdate, { new: true });
      })
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found.' });
        }
        updatedUser.password = undefined;
        res.json(updatedUser);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Error updating user profile.' });
      });
  } else {

    User.findByIdAndUpdate(id, userToUpdate, { new: true })
    .populate('tasks')
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).send({ message: 'User not found.' });
        }
        res.json(updatedUser);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);

        res.status(500).send({ message: 'Error updating user profile.' });

      })
  }
};

module.exports.updateProfilePic = (req, res, next) => {
  const { id } = req.params;
  const userToUpdate = {
    ...req.body,
  }

  if (req.file) {
    userToUpdate.imageUrl = req.file.path;
  }
  
    User.findByIdAndUpdate(id, userToUpdate, { new: true })
    .populate('tasks')
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).send({ message: 'User not found.' });
        }
        res.json(updatedUser);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);

        res.status(500).send({ message: 'Error updating user profile.' });

      })
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
    .populate('tasks')
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((dbUsers) => {
      res.status(StatusCodes.OK).json(dbUsers)
    })
    .catch(next);
};