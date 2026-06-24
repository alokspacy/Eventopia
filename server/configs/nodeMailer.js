import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  connectionTimeout: 10000, // 10 seconds connection timeout
  socketTimeout: 10000,     // 10 seconds socket timeout
  greetingTimeout: 10000,   // 10 seconds greeting timeout
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, body }) => {
  const response = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  });

  return response;
};

export { sendEmail };
