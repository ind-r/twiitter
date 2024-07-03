import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true,
  },
  commentContent: String,
});

commentSchema.set("timestamps", true);

const Comment =
  mongoose.models.Tweet || mongoose.model("Comment", commentSchema);

export default Comment;

// likes: [String],
// shares: [String],
