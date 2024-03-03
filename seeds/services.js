const Service = require("./../models/Service.model");
const mongoose = require("mongoose");

require("dotenv").config();
require("./../config/db.config");

const services = [
  {
    name: "Communication",
    description:"Based in Madrid, Piggies has a global impact through its designs and collaborations. Comprised of a vibrant team of designers, artists, and writers, we are committed to collaborating with innovative organizations. Our focus is on crafting tailor-made digital solutions, captivating visual content, and unforgettable brand experiences for clients",
    number:"01",
    imgUrl:"https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709378370/Piggies/Image_nnnkm5.png",
    categories: ["Public Relations", "Press", "Corporative comm", "Corporative podcasting"],
  },
  {
    name: "Planning",
    description:"Based in Madrid, Piggies has a global impact through its designs and collaborations. Comprised of a vibrant team of designers, artists, and writers, we are committed to collaborating with innovative organizations. Our focus is on crafting tailor-made digital solutions, captivating visual content, and unforgettable brand experiences for clients",
    number:"02",
    imgUrl:"https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709378369/Piggies/Image-1_tsmfnz.png",
    categories: ["Media Planning", "Events Organization", "Comm Strategy", "Stakeholders"],
  },
  {
    name: "Marketing",
    description:"Based in Madrid, Piggies has a global impact through its designs and collaborations. Comprised of a vibrant team of designers, artists, and writers, we are committed to collaborating with innovative organizations. Our focus is on crafting tailor-made digital solutions, captivating visual content, and unforgettable brand experiences for clients",
    number:"03",
    imgUrl:"https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709378371/Piggies/Image-3_wk5ho9.png",
    categories: ["SEO", "SEM", "Google Ads", "Web Analytics"],
  },
  {
    name: "Social Media",
    description:"Based in Madrid, Piggies has a global impact through its designs and collaborations. Comprised of a vibrant team of designers, artists, and writers, we are committed to collaborating with innovative organizations. Our focus is on crafting tailor-made digital solutions, captivating visual content, and unforgettable brand experiences for clients",
    number:"04",
    imgUrl:"https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709378370/Piggies/Image-2_fhwjsf.png",
    categories: ["Media Planning", "Social Media", "Social Ads"],
  },
  {
    name: "Design",
    description:"Based in Madrid, Piggies has a global impact through its designs and collaborations. Comprised of a vibrant team of designers, artists, and writers, we are committed to collaborating with innovative organizations. Our focus is on crafting tailor-made digital solutions, captivating visual content, and unforgettable brand experiences for clients",
    number:"05",
    imgUrl:"https://res.cloudinary.com/dmbtvuj1x/image/upload/v1709378371/Piggies/Image-4_j0bl4w.png",
    categories: ["Design", "Photography", "Web Design"],
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
