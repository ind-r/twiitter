import mongoose, { Document } from "mongoose";

export interface TweetType extends Document {
  userId: string;
  tweetContent: string;
  likes: string[];
  shares: string[];
}

const tweetSchema = new mongoose.Schema({
  userId: String,
  tweetContent: String,
  likes: [String],
  shares: [String],
});
tweetSchema.set("timestamps", true);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
