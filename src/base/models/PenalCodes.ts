import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IPenalCodes extends Document {
  _id: ObjectId;
  code: number;
  crime: string;
  type: string;
  fine: number;
  jail: number;
}

const schema = new Schema<IPenalCodes>({
  code: Number,
  crime: String,
  type: String,
  fine: Number,
  jail: Number,
});

export const PenalCodesModel: Model<IPenalCodes> =
  mongoose.models["Penal Codes"] ||
  mongoose.model<IPenalCodes>("Penal Codes", schema);
