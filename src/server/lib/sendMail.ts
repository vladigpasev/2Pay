import nodemailer from 'nodemailer';

const GLOBAL_TRANSPORTER = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


export const sendMail = ({ to, body, subject }: { to: string; body: string; subject: string }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: body
  };

  return new Promise((resolve, reject) => {
    GLOBAL_TRANSPORTER.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
