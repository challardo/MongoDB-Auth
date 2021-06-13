"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: 'Misandbox.correo@gmail.com',
    // generated ethereal user
    pass: 'jyekedtjtkbdtgri' // generated ethereal password

  }
});
exports.transporter = transporter;