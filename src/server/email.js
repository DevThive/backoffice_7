import nodemailer from 'nodemailer';
import { temp } from './template.js';

const getEmailData = (to, authCode) => {
  data = {
    from: 'Admin Email',
    to,
    subject: 'Hello',
    html: temp(authCode),
  };
  return data;
};

export const sendEmail = (to, authCode) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mail = getEmailData(to, authCode);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent successfully');
    }
    smtpTransport.close();
  });
};
