import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  userId: String,
  tweetContent: String,
});
tweetSchema.set("timestamps", true);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
// comments: [String],
// likes: [String],
// shares: [String],
