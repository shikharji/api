const transporter = require("../config/email");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");

async function sendWelcomeEmail(email, name) {
  try {
    const mailOptions = {
      from: "parasnathhills@gmail.com",
      to: email,
      subject: "Welcome to Sri Shikharji!",
      html: ` <h1>Welcome to Shikharji App, ${name}</h1>
        <h2>Hi there! We're thrilled to have you join our community.</h2>
        <h3>Here, you'll discover a wealth of knowledge, learning, and philosophy of the Jainism community. <br/> We hope you find it enriching and fulfilling.</h3>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <h2>Happy exploring!</h2>
        <div style="text-align: center;">
        <img src="https://cdn.pixabay.com/photo/2022/11/29/11/30/lake-7624330_960_720.jpg" alt="Pixabay" style="width: 100%; max-width: 600px;">
        </div>
        <h3><a href="https://srishikharji.vercel.app/">Visit Shikharji App</a></h3>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome Email sent");
  } catch (error) {
    console.error(error);
  }
}

async function sendWelcomeBackEmail(email, userName) {
  try {
    const mailOptions = {
      from: "parasnathhills@gmail.com",
      to: email,
      subject: "Welcome back to Sri Shikharji!",
      html: ` <h1>Welcome back, ${userName}!</h1>
      <h2>Hi there! Welcome back to Sri Shikharji App.</h2>
      <h3>We're excited to see you again and continue your journey with us.</h3>
      <p>If you have any questions or need assistance, feel free to reach out to us.</p>
      <h2>Happy exploring!</h2>
      <div style="text-align: center;">
      <img src="https://cdn.pixabay.com/photo/2022/11/29/11/30/lake-7624330_960_720.jpg" alt="Pixabay" style="width: 100%; max-width: 600px;">
      </div>
      <h3><a href="https://srishikharji.vercel.app/">Visit Shikharji App</a></h3>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("welcome back Email sent");
  } catch (error) {
    console.error(error);
  }
}

const sendVerificationEmail = async (email, _id) => {
  const jwtSecret = process.env.jwt_secret_key;
  const token = jwt.sign({ _id }, jwtSecret, { expiresIn: "15m" });
  const url = `http://localhost:3000/verify-email/${token}`;
  const mailOptions = {
    from: "parasnathhills@gmail.com",
    to: email,
    subject: "Verify your email",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #4CAF50;">Welcome to Sri Shikharji!</h2>
      <p>Dear User,</p>
      <p>Thank you for registering at the Sri Shikharji App. We are excited to have you join our community. To complete your registration and start exploring, please verify your email address by clicking the link below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
      </div>
      <p>If you did not request this email, please ignore it and no action is required.</p>
      <p>Thank you,<br/>Shikharji Team</p>
      <hr/>
      <p style="font-size: 12px; color: #777; text-align: center;">
        Sri Shikharji | <a href="https://srishikharji.vercel.app/">Visit Our Website</a> | Email: parasnathhills@gmail.com
      </p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendWelcomeBackEmail,
  sendVerificationEmail,
};
