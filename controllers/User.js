const User = require("../models/User");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const { generateCoolUsername } = require("../utils/username");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  sendWelcomeEmail,
  sendWelcomeBackEmail,
  sendVerificationEmail,
} = require("./emailService");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists", error: true });
    }

    const coolUsername = await generateCoolUsername(name);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      username: coolUsername,
      isNewUser: true,
    });

    await user.save();
    await sendVerificationEmail(email, user._id);

    res
      .status(201)
      .json({ message: "User registered successfully", error: false });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Internal server error. Please try again later.",
        error: true,
      });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const jwtSecret = process.env.jwt_secret_key;
  if (!jwtSecret) {
    console.error("JWT secret key is not set");
    return res.status(500).send({ message: "Server configuration error" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).send({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(200).send({ message: "Email is already verified" });
    }

    user.isVerified = true;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).send({ message: "Invalid token.." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    if (!user.isNewUser) {
      await sendWelcomeBackEmail(email, user.name);
    }
    user.isNewUser = false;
    await user.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller method to fetch user details by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
