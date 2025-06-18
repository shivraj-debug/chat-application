import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true }
);

const GroupMessage = mongoose.model("GroupMessage", messageSchema);
export default GroupMessage;
