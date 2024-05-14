const express = require("express");
const { register, login, getUserById } = require("../controllers/User");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", getUserById);

module.exports = router;
