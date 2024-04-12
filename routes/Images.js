const express = require("express");
const {
  getAllImages,
  getOnlyShikharjiImages,
  getImageById,
} = require("../controllers/Images");

const router = express.Router();

router.get("/", getAllImages);
router.get("/shikharji", getOnlyShikharjiImages);
router.get("/:id", getImageById);

module.exports = router;
