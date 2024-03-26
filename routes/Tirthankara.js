const express = require("express");
const {
  getAllTirthankar,
  getTirthankarById,
} = require("../controllers/Tirthankara");

const router = express.Router();

router.get("/", getAllTirthankar);
router.get("/:id", getTirthankarById);

module.exports = router;
