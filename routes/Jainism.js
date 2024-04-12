const express = require("express");
const {
  getAllJainismBlogs,
  getJainismBlogById,
  getCosmologyJainismBlogs,
  getArtJainismBlogs,
  getPhilosophyJainismBlogs,
  getPrincipleJainismBlogs,
  getPracticeJainismBlogs,
  getTextsJainismBlogs,
} = require("../controllers/Jainism");

const router = express.Router();

router.get("/", getAllJainismBlogs);
router.get("/cosmology", getCosmologyJainismBlogs);
router.get("/art", getArtJainismBlogs);
router.get("/philosophy", getPhilosophyJainismBlogs);
router.get("/principle", getPrincipleJainismBlogs);
router.get("/practice", getPracticeJainismBlogs);
router.get("/texts", getTextsJainismBlogs);
router.get("/:id", getJainismBlogById);

module.exports = router;
