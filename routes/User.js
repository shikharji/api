const express = require("express");
const {
  register,
  login,
  getUserById,
  verifyEmail,
} = require("../controllers/User");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.get("/profile/:id", getUserById);

module.exports = router;
