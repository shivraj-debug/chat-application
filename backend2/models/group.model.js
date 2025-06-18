import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: ""},
    avatar: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members:[
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["admin", "member"], default: "member" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
