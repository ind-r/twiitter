import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tweetContent: { type: String, required: true },
  tweetType: { type: Number, required: true },
  tweetRefId: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
});

tweetSchema.set("timestamps", true);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
