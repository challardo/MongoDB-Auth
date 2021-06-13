const nodemailer = require("nodemailer");

export const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'Misandbox.correo@gmail.com', // generated ethereal user
      pass: 'jyekedtjtkbdtgri', // generated ethereal password
    },
  });
