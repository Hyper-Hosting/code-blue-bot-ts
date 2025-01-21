import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface ITexts extends Document {
  _id: ObjectId;
  userIds: string[];
  messages: string[];
}

const schema = new Schema<ITexts>({
  userIds: Array,
  messages: Array,
});

export const TextModel: Model<ITexts> =
  mongoose.models["texts"] || mongoose.model<ITexts>("texts", schema);
