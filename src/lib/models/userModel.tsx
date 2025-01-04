import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  nickname: String,
  googleId: String,
  password: { type: String, select: false },
  image: String,
});
userSchema.set("timestamps", true);

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model("User", userSchema);
// var User = mongoose.model('User', userSchema);

export default User;

// tweets: [String],
// comments: [String],
// likes: [String],
// shares: [String],
