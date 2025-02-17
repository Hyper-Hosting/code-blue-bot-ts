import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { IBusiness } from "./Business-old";

export interface IShifts extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  businessId: ObjectId | IBusiness;
  amount: Number;
}

const schema = new Schema<IShifts>({
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
  amount: Number,
});

export const ShiftModel: Model<IShifts> =
  mongoose.models["Shifts"] || mongoose.model<IShifts>("Shifts", schema);
