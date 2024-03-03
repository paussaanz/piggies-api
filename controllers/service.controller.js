const Service = require("../models/Service.model");

module.exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({number: 1});
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
