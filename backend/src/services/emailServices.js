import Resend from "../config/mailConfig.js"
import config from "../config/config.js";
// import transporter from "../config/mailConfig.js";


export const sendVerificationEmail = async (to, link) => {
  const subject = "Verify your email";
  const html = `
    <p>Hello,</p>
    <p>Click the link below to verify your email address:</p>
    <p><a href="${link}">Verify Email</a></p>
    <p>This link will expire in 15 minutes.</p>
  `;

  // await transporter.sendMail({ to, subject, html });  can't use smtp in free tier render it will block the smtp connection
  try {
    await Resend.emails.send({
      from: config.SENDER_EMAIL,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};
