import nodemailer from "nodemailer";
import { env } from "../../config/env";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    console.log(`Email skipped: ${subject} -> ${to}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass
    }
  });

  await transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html
  });
};
