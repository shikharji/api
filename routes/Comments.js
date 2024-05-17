const express = require("express");
const {
  createCommentForBlogPost,
  getCommentsForBlogPost,

  createCommentForResource,
  getCommentsForResource,
} = require("../controllers/Comments");

const router = express.Router();

router.post("/:id/comment", createCommentForBlogPost);
router.get("/:id/comment", getCommentsForBlogPost);

router.post("/temple/:resourceId/comments", createCommentForResource);
router.get("/temple/:resourceId/comments", getCommentsForResource);

router.post("/tirthankara/:resourceId/comments", createCommentForResource);
router.get("/tirthankara/:resourceId/comments", getCommentsForResource);

module.exports = router;
