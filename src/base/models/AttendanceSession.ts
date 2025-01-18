import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IAttendanceSession extends Document {
  _id: ObjectId;
  date: Date;
}

const schema = new Schema<IAttendanceSession>({
  date: {
    type: Date,
    default: Date.now,
  },
});

export const AttendanceSessionModel: Model<IAttendanceSession> =
  mongoose.models["Attendance Sessions"] ||
  mongoose.model<IAttendanceSession>("Attendance Sessions", schema);
