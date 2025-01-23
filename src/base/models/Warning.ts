import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface IWarnings extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  staffId: ObjectId | IUser;
  type: "server" | "department";
  description: string;
  createdAt: Date;
}

const schema = new Schema<IWarnings>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  type: {
    type: String,
    enum: ["server", "department"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const WarningModel: Model<IWarnings> =
  mongoose.models["Warnings"] || mongoose.model<IWarnings>("Warnings", schema);
