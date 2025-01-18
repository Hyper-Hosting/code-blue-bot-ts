import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";

export interface ITrespassNotice extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characterId: ObjectId | ICharacter | string;

  // INFORMATION
  date: Date;
  trespassIssuer: string;
  businessName: string;
  address: string;
  postal: string;
}

const schema = new Schema<ITrespassNotice>({
  // OFFICER INFORMATION
  officerAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accounts",
    required: true,
  },
  officerName: String,
  officerDepartment: String,
  officerCallsign: String,
  officerRank: String,

  // CIVILIAN INFORMATION
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Characters",
    required: true,
  },

  // INFORMATION
  date: Date,
  trespassIssuer: String,
  businessName: String,
  address: String,
  postal: String,
});

export const TrespassNoticeModel: Model<ITrespassNotice> =
  mongoose.models["Trespass Notice"] ||
  mongoose.model<ITrespassNotice>("Trespass Notice", schema);
