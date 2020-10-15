const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kataSchema = new Schema({
    title: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    technologies: { type: String },
    upVotes: { type: Array },
    downVotes: { type: Array }
    // comments: [commentSchema],
});



// const Comments = mongoose.model("Comment", commentSchema);

const Katas = mongoose.model("Kata", kataSchema);

// module.exports = Comments;

module.exports = Katas;