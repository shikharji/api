const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const generateCoolUsername = async (baseUsername) => {
  const additionalStrings = [
    "Jain",
    "Shikharji",
    "Tirthankar",
    "Mahavir",
    "Ahimsa",
    "Jainism",
    "Digambar",
    "Shravanabelagola",
    "Pilgrimage",
    "Samadhi",
  ];

  let username = baseUsername.toLowerCase().replace(/\s/g, "");
  let additionalString =
    additionalStrings[Math.floor(Math.random() * additionalStrings.length)];
  let finalUsername = username + "." + additionalString;

  // Check if the finalUsername is already taken in the database
  let existingUser = await checkExistingUser(finalUsername);
  let counter = 1;
  while (existingUser) {
    // If the username is taken, append a number from 1 to 99
    finalUsername = username + "." + additionalString + counter;
    existingUser = await checkExistingUser(finalUsername);
    counter++;
    if (counter > 99) {
      break;
    }
  }
  return finalUsername;
};

const checkExistingUser = async (username) => {
  try {
    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });
    return !!existingUser; // Return true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking existing user:", error);
    return true; // Return true to indicate an error occurred
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const coolUsername = await generateCoolUsername(name);
    // Create new user
    user = new User({
      name,
      email,
      password,
      username: coolUsername,
    });

    const salt = await bcrypt.genSalt(1);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "parasnathhills@gmail.com",
        pass: "vurb wfca ursa enby",
      },
    });

    const mailOptions = {
      from: "parasnathhills@gmail.com",
      to: email,
      subject: "Welcome to Sri Shikharji!",
      html: ` <h1>Welcome to Shikharji App, ${name}</h1>
      <h2>Hi there! We're thrilled to have you join our community.</h2>
      <p>Here, you'll discover a wealth of knowledge, learning, and philosophy of the Jainism community. <br/> We hope you find it enriching and fulfilling.</p>
      <p>If you have any questions or need assistance, feel free to reach out to us.</p>
      <p>Happy exploring!</p>
      <div style="text-align: center;">
      <img src="https://cdn.pixabay.com/photo/2022/11/29/11/30/lake-7624330_960_720.jpg" alt="Pixabay" style="width: 100%; max-width: 600px;">
      </div>
      <p><a href="https://srishikharji.vercel.app/">Visit Shikharji App</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send welcome back email
    if (!req.body.autoLogin) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "parasnathhills@gmail.com",
          pass: "vurb wfca ursa enby",
        },
      });

      const mailOptions = {
        from: "parasnathhills@gmail.com",
        to: email,
        subject: "Welcome back to Sri Shikharji!",
        html: ` <h1>Welcome back, ${user.name}!</h1>
        <h2>Hi there! Welcome back to Sri Shikharji App.</h2>
        <p>We're excited to see you again and continue your journey with us.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <p>Happy exploring!</p>
        <div style="text-align: center;">
        <img src="https://cdn.pixabay.com/photo/2022/11/29/11/30/lake-7624330_960_720.jpg" alt="Pixabay" style="width: 100%; max-width: 600px;">
        </div>
        <p><a href="https://srishikharji.vercel.app/">Visit Shikharji App</a></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

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
