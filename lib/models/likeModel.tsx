import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true,
  },
});

LikeSchema.set("timestamps", true);

const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);

export default Like;
