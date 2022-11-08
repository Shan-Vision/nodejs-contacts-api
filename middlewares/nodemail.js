const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'shan.abdullaev@gmail.com',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);
const email = {
  to: 'perfekt.vision2019@gmail.com',
  from: 'shan.abdullaev@gmail.com',
  subject: '',
  html: ``,
};

transport
  .sendMail(email)
  .then(() => console.log('email send success'))
  .catch(error => console.log(error.message));
