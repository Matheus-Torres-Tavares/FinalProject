
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    title: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    technologies: { type: String },
    upVotes: { type: Array },
    downVotes: { type: Array },
    kind: { type: String, default: "feedback" }
    // comments: [commentSchema],
});


const Feedbacks = mongoose.model("Feedback", feedbackSchema);

// module.exports = Comments;

module.exports = Feedbacks;
