const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId },
    postID: { type: Schema.Types.ObjectId },
    date: { type: Date, default: Date.now }
    // comments: [commentSchema],
  });

  module.exports = model("Comment", commentSchema);