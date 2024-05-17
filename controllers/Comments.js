const Comment = require("../models/Comment");
const mongoose = require("mongoose");

exports.createCommentForBlogPost = async (req, res) => {
  const { id } = req.params;
  const { topic, body, userId } = req.body;

  try {
    const comment = new Comment({ postId: id, topic, body, userId });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.getCommentsForBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ postId: id });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// commentController.js

exports.createCommentForResource = async (req, res) => {
  const { resourceId } = req.params;
  const { topic, body, userId } = req.body;
  const { resourceType } = req.query;

  try {
    if (!resourceId || !topic || !body || !userId || !resourceType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ message: "Invalid resourceId" });
    }

    const comment = new Comment({
      resourceId,
      resourceType,
      topic,
      body,
      userId,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    } else if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid resourceId format" });
    }
    res.status(500).send("Server Error");
  }
};

exports.getCommentsForResource = async (req, res) => {
  const { resourceId } = req.params;
  const { resourceType } = req.query;

  try {
    if (!resourceId || !resourceType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ message: "Invalid resourceId" });
    }
    const comments = await Comment.find({ resourceId });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error(err.message);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid resourceId format" });
    }
    res.status(500).send("Server Error");
  }
};
