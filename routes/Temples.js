const express = require("express");
const {
  getAllTemples,
  getTempleById,
  getOnlyShikharjiTemples,
} = require("../controllers/Temples");

const router = express.Router();

router.get("/shikharji", getOnlyShikharjiTemples);
router.get("/", getAllTemples);
router.get("/:id", getTempleById);

module.exports = router;
