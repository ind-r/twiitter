import mongoose, { Document } from "mongoose";

const tweetSchema = new mongoose.Schema({
  userId: String,
  tweetContent: String,
  likes: [String],
  shares: [String],
});
tweetSchema.set("timestamps", true);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
