const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateCoolUsername = async (baseUsername) => {
  let username = baseUsername.toLowerCase().replace(/\s/g, ""); // Convert to lowercase and remove spaces
  let uniqueId = Math.random().toString(36).substring(4);

  // Check if the username is already in use
  let existingUser = await User.findOne({ username });
  while (existingUser) {
    // If the username is already in use, generate a new one
    uniqueId = Math.random().toString(36).substring(4);
    username = baseUsername.toLowerCase().replace(/\s/g, "") + uniqueId;
    existingUser = await User.findOne({ username });
  }

  return username;
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Generate a cool username
    const coolUsername = await generateCoolUsername(name);

    // Create new user
    user = new User({ name, email, password, username: coolUsername });

    // Hash password
    const salt = await bcrypt.genSalt(1);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
