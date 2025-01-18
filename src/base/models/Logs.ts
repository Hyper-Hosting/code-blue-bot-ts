import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface ILogs extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  logType: string;
  logTitle: string;
  info: string[];
  filterName: string;
  timestamp: Date;
}

const schema = new Schema<ILogs>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  logType: String,
  logTitle: String,
  info: Array,
  filterName: String,
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

export const LogsModel: Model<ILogs> =
  mongoose.models["Logs"] || mongoose.model<ILogs>("Logs", schema);
