import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { UnitStatus } from "../types/UnitStatus";

export interface IUnit extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  active: boolean;
  unitExpiry: Date;
  status: UnitStatus;
  subdivision: string;
  groupName: string;
  socketId: string;
  panicBtn: boolean;
  activeCall: number;
}

const schema = new Schema<IUnit>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  active: Boolean,
  unitExpiry: Date,
  status: String,
  subdivision: String,
  groupName: String,
  socketId: String,
  panicBtn: Boolean,
  activeCall: Number,
});

export const UnitModel: Model<IUnit> =
  mongoose.models["Unit"] || mongoose.model<IUnit>("Unit", schema);
