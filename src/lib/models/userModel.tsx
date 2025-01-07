import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  nickname: String,
  googleId: { type: String, default: "" },
  bio: String,
  password: { type: String },
  image: String,
});
userSchema.set("timestamps", true);

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model("User", userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
