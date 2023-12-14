import mongoose from 'mongoose';

export type UserType = {
  _id: string,
  email: string,
  username: string,
  nickname: string,
  password: string,
  image: string,
}

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  nickname: String,
  password: String,
  image: String,
});

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model('User', userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
