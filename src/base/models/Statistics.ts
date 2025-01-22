import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
export interface IStatistics extends Document {
  _id: ObjectId;
  year: number;
  month: number;
  day: number;
  serverJoinsInterview: number;
  serverJoinsMain: number;
  newAccounts: number;
  applicationBans: number;
  applicationsCompleted: number;
}

const schema = new Schema<IStatistics>({
  year: {
    required: true,
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    required: true,
    type: Number,
    default: new Date().getMonth() + 1,
  },
  day: {
    required: true,
    type: Number,
    default: new Date().getDate() + 1,
  },
  serverJoinsInterview: {
    required: true,
    type: Number,
    default: 0,
  },
  serverJoinsMain: {
    required: true,
    type: Number,
    default: 0,
  },
  newAccounts: {
    required: true,
    type: Number,
    default: 0,
  },
  applicationBans: {
    required: true,
    type: Number,
    default: 0,
  },
  applicationsCompleted: {
    required: true,
    type: Number,
    default: 0,
  },
});

export const StatisticsModel: Model<IStatistics> =
  mongoose.models["Statistics"] ||
  mongoose.model<IStatistics>("Statistics", schema);
