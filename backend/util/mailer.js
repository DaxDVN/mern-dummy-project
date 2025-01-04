import sgMail from '@sendgrid/mail';
import {MAIL_FROM, MAIL_KEY} from "../config.js";

sgMail.setApiKey(MAIL_KEY);

export const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: MAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    const result = await sgMail.send(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
