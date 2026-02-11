import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Session = models.Session || model("Session", SessionSchema);
export default Session;

