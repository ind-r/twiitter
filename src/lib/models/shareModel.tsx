import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true,
  },
});

ShareSchema.set("timestamps", true);

const Share = mongoose.models.Share || mongoose.model("Share", ShareSchema);

export default Share;
