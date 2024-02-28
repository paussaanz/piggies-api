const Service = require("./../models/Service.model");
const mongoose = require("mongoose");

require("dotenv").config();
require("./../config/db.config");

const services = [
  {
    name: "Communication",
  },
  {
    name: "Planning",
  },
  {
    name: "Marketing",
  },
  {
    name: "Social Media",
  },
  {
    name: "Design",
  },
];

mongoose.connection.collections["services"].drop((err) => {
  console.log("collection dropped");

  services.forEach((service) => {
    Service.create(service)
      .then((createdService) => {
        console.log(`Created service: ${createdService.name}`);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
