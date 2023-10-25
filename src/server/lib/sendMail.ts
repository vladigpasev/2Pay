const nodemailer = require('nodemailer');

import * as dotenv from 'dotenv';
dotenv.config();

var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  }
});

export const sendMail = ({ to, body, subject }: { to: string; body: string; subject: string }) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: to,
    subject: subject,
    html: body
  };

  transporter.sendMail(mailOptions, function (error: string, info: any) {
    if (error) {
      console.error('Custom Mail Send Error: ' + error);
      throw new Error(error);
    } else {
      console.log(`A mail has been sent to: ${to}`);
      return true;
    }
  });
};
