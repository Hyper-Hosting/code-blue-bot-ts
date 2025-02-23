import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IBusiness extends Document {
  _id: ObjectId;
  ceoId: ObjectId | string;
  cooId: ObjectId | string;
  cfoId: ObjectId | string;
  name: string;
  acceptedRoles: string[];
  questions: {
    question: string;
    description: string;
    type: "short" | "long";
  }[];
  acceptingApps: boolean,
  applicationChannel: string;
  leaderboardChannel: string;
  clockInChannel: string;
  leaderboardMessageId: string;
}

const schema = new Schema<IBusiness>({
  ceoId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cooId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  cfoId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  name: String,
  acceptedRoles: Array,
  questions: Array,
  acceptingApps: Boolean,
  applicationChannel: String,
  leaderboardChannel: String,
  clockInChannel: String,
  leaderboardMessageId: String,
});

export const BusinessModel: Model<IBusiness> =
  mongoose.models["Business"] ||
  mongoose.model<IBusiness>("Business", schema, "Business");
