const express = require("express");
const { getAllTonks } = require("../controllers/Tonks");

const router = express.Router();

router.get("/", getAllTonks);

module.exports = router;
