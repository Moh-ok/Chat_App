import mongoose, { Document, Schema, Types } from "mongoose";
const ChatSchema = new Schema({
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
}, {
    timestamps: true,
});
ChatSchema.index({ users: 1 }, { unique: true });
export const Chat = mongoose.model("Chat", ChatSchema);
//# sourceMappingURL=Chat.js.map