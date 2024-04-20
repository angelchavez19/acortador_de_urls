import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_HOST_PASSWORD,
  EMAIL_HOST_USER,
  EMAIL_PORT,
} from "~/config/app.config";

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_HOST_USER,
    pass: EMAIL_HOST_PASSWORD,
  },
});

export const sendMail = async (email: string, subject: string, html: string) =>
  await transporter.sendMail({
    from: EMAIL_HOST_USER,
    to: email,
    subject,
    html,
  });
