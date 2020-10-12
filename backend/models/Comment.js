const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  postID: { type: Schema.Types.ObjectId, ref: "Post" },
  date: { type: Date, default: Date.now }
  // comments: [commentSchema],
});

const Comments = mongoose.model("Comment", commentSchema);

// module.exports = Comments;

module.exports = Comments;