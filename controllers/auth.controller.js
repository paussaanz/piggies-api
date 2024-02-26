const jwt = require('jsonwebtoken');
const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.doLogin = (req, res, next) => {
    const { username, password } = req.body;
    const ERROR_MSG = "Usuario o contraseña incorrectos"
    const errorFn = () => next(createError(StatusCodes.BAD_REQUEST, ERROR_MSG));

    User.findOne({ username })
        .then((user) => {
            if (user) {
                return user.checkPassword(password).then((match) => {
                    if (match) {
                        const token = jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET || 'test',
                            { expiresIn: '1d' }
                        )
                        res.json({ accessToken: token });
                    } else {
                        errorFn()
                    }
                });
            } else {
                errorFn()
            }
        })
        .catch(next);
};