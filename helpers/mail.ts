import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

export const sendMail = async (email: string, subject: string, html: string) =>
  await transporter.sendMail({
    from: process.env.EMAIL_HOST_USER,
    to: email,
    subject,
    html,
  });
