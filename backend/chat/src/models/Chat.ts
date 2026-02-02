import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  users: Types.ObjectId[];
  latestMessage?: {
    text: string;
    sender: Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    latestMessage: {
      text: { type: String },
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({ users: 1 }, { unique: true });

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
