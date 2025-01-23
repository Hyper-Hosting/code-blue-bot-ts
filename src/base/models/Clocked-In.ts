import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface IClockedIn extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  businessId: ObjectId | IClockedIn;
  endTime: Date;
  channelId: string;
  messageSent: boolean;
}

const schema = new Schema<IClockedIn>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  endTime: Date,
  channelId: String,
  messageSent: {
    type: Boolean,
    default: false,
  },
});

export const ClockedInModel: Model<IClockedIn> =
  mongoose.models["Clocked In"] ||
  mongoose.model<IClockedIn>("Clocked In", schema);
