// const { Schema, model } = require("mongoose");

// const commentSchema = new Schema({
//     author: { type: String, required: true },
//     body: { type: String, required: true },
//     created: { type: Date, default: Date.now },
//     postId: { type: String, required: true },
//     upVotes: { type: Number, default: 0 },
//     downVotes: { type: Number, default: 0 },
//     parentId: { type: String, default: null }

// });

// const postSchema = new Schema({
//     title: { type: String, required: true },
//     postType: { type: [String], enum: ['Collab', 'Critique', 'Kata'] },
//     author: { type: String, required: true },
//     body: { type: String, required: true },
//     created: { type: Date, default: Date.now },
//     author: { type: String, required: true },
//     upVotes: { type: Number, default: 0 },
//     downVotes: { type: Number, default: 0 },
//     postId: { type: String, required: true },
//     comments: [commentSchema],
//     views: { type: Number, default: 0 },

// })

// module.exports = model("Post", postSchema);
// module.exports = model("Comment", commentSchema)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // comments: [commentSchema],
});

// const Comments = mongoose.model("Comment", commentSchema);

const Posts = mongoose.model("Post", postSchema);

// module.exports = Comments;

module.exports = Posts;
