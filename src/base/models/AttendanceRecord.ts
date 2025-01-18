import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IAttendanceSession } from "./AttendanceSession";

export interface IExample extends Document {
  _id: ObjectId;
  accountId: ObjectId;
  session: ObjectId | IAttendanceSession;
  status: "present" | "absent" | "pending";
  timestamp: Date;
}

const schema = new Schema<IExample>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
    required: true,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: "Attendance Sessions",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "pending"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const AttendanceRecordModel: Model<IExample> =
  mongoose.models["Attendance Records"] ||
  mongoose.model<IExample>("Attendance Records", schema);
