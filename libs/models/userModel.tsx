import mongoose, { Document } from 'mongoose'

export interface UserInfo {
  username: string,
  nickname: string,
  image: string,
}
export interface UserType extends Document {
  email: string,
  username: string,
  nickname: string,
  googleId?: string,
  tweets: [string]
  shares: [string]
  likes: [string]
  password: string,
  image: string,
}

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  nickname: String,
  googleId: String,
  tweets: [String],
  likes: [String],
  shares: [String],
  password: String,
  image: String,
});

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model('User', userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
