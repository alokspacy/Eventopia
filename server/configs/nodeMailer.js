import nodemailer from "nodemailer";
import axios from "axios";

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
  // Try sending via Brevo HTTP API first (over HTTPS port 443, which is allowed on Render)
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Eventopia",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.SMTP_PASS,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    console.log("Email sent successfully via Brevo HTTP API:", response.data);
    return response.data;
  } catch (apiError) {
    // If the HTTP API fails or says unauthorized (e.g. if SMTP_PASS is an SMTP-only key), fall back to SMTP
    const isUnauthorized = apiError.response && (apiError.response.status === 401 || apiError.response.data?.code === "unauthorized");
    if (isUnauthorized) {
      console.warn("Brevo HTTP API Key unauthorized (SMTP-only key), falling back to SMTP...");
    } else {
      console.warn("Brevo HTTP API failed, falling back to SMTP:", apiError.message);
    }

    const response = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("Email sent successfully via SMTP fallback:", response.messageId);
    return response;
  }
};

export { sendEmail };
