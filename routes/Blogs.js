const express = require("express");
const {
  getAllBlog,
  getBlogById,
  getOnlyJainismBlogs,
  getOnlyShikharjiBlogs,
} = require("../controllers/Blogs");

const router = express.Router();

router.get("/", getAllBlog);
router.get("/jainism", getOnlyJainismBlogs);
router.get("/shikharji", getOnlyShikharjiBlogs);
router.get("/:id", getBlogById);

module.exports = router;
