import mongoose, { Document } from "mongoose";

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
userSchema.set("timestamps", true);

userSchema.set("timestamps", true);

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model("User", userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
