import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IBusiness extends Document {
  _id: ObjectId;
  name: string;
  ceoId: string;
  cfoId: string;
  cooId: string;
  clockInChannelId: string;
  leaderboardChannelId: string;
  applicationResultsChannelId: string;
  leaderboardMessageId: string;
  acceptedRole1: string;
  acceptedRole2: string;
  acceptedRole3: string;
  questions: string[];
  minimumAge: Number;
  logo: string;
  colour: string;
}

const schema = new Schema<IBusiness>({
  name: String,
  ceoId: String,
  cfoId: String,
  cooId: String,
  clockInChannelId: String,
  leaderboardChannelId: String,
  applicationResultsChannelId: String,
  leaderboardMessageId: String,
  acceptedRole1: String,
  acceptedRole2: String,
  acceptedRole3: String,
  questions: Array,
  minimumAge: Number,
  logo: String,
  colour: String,
});

export const BusinessModel: Model<IBusiness> =
  mongoose.models["Businesses"] ||
  mongoose.model<IBusiness>("Businesses", schema);
