import { Message } from "discord.js";
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IUiLogs extends Document {
  _id: ObjectId;
  logId: number;
  userId: string;
  userNickname: string;
  channelId: string;
  messages: (Message & {
    author: {
      displayAvatarURL: string;
    };
  })[];
}

const schema = new Schema<IUiLogs>({
  logId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userNickname: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  messages: Array,
});

export const UiLogModel: Model<IUiLogs> =
  mongoose.models["UI Logs"] || mongoose.model<IUiLogs>("UI Logs", schema);
