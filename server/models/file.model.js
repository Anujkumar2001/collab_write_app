import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    shared: {
      type: String,
    },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const File = mongoose.model("File", fileSchema);
