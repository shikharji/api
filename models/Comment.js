const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  // postId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "blogs",
  //   required: true,
  // },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
