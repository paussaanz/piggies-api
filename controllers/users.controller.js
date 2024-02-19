const User = require("../models/User.model");


module.exports.create = (req, res, next) => {
  const { email, name } = req.body;
  User.create({ email, name })
    .then((userCreated) => {
      res.status(302).json(userCreated);
    })
    .catch(next);
};

