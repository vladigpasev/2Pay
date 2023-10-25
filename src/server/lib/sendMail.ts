import nodemailer from 'nodemailer';

const GLOBAL_TRANSPORTER = nodemailer.createTransport({
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

  return new Promise(resolve => GLOBAL_TRANSPORTER.sendMail(mailOptions, error => resolve(error)));
};
