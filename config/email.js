const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parasnathhills@gmail.com",
    pass: "vurb wfca ursa enby",
  },
});

module.exports = transporter;
