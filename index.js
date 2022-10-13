import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

dotenv.config();

// nodemailer

function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASS,
    },
  });
  const mail_options = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: 'This is a testing email sending',
    html: '<h1>Testing email sending using node/express.js</h1>',
  };
  transporter.sendMail(mail_options, function (err, info) {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
}

app.get('/', (req, res) => {
  sendEmail();
  res.status(200).send('email send successfully!');
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  } else {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
