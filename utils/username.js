const User = require("../models/User");

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
    return true;
  }
};

module.exports = { generateCoolUsername };
