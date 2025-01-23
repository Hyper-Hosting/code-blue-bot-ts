import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IMainServer extends Document {
  _id: ObjectId;
  rpVote: Date;
}

const schema = new Schema<IMainServer>({
  rpVote: Date,
});

export const MainServerModel: Model<IMainServer> =
  mongoose.models["Main Server"] ||
  mongoose.model<IMainServer>("Main Server", schema, "Main Server");
