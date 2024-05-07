import mongoose, { Document } from 'mongoose'

export interface TweetType extends Document {
  username: string,
  tweetContent: string,
  likes: number,
  shares: number,
}

const tweetSchema = new mongoose.Schema({
  username: String,
  tweetContent: String,
  likes: Number,
  shares: Number,
})

const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);

export default Tweet
