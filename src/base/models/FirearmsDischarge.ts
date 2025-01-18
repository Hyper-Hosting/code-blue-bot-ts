import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";

export interface IFirearmsDischarge extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characterId: ObjectId | ICharacter | string;

  // EXTRA INFORMATION
  location: string;
  numOfShots: string;
  suspectStatus: string;
  firstAidProvided: string;
  bulletTrajectory: string;
  debrief: string;
  date: Date;
}

const schema = new Schema<IFirearmsDischarge>({
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

  // EXTRA INFORMATION
  location: String,
  numOfShots: String,
  suspectStatus: String,
  firstAidProvided: String,
  bulletTrajectory: String,
  debrief: String,
  date: Date,
});

export const FirearmsDischargeModel: Model<IFirearmsDischarge> =
  mongoose.models["Firearms Discharge"] ||
  mongoose.model<IFirearmsDischarge>("Firearms Discharge", schema);
