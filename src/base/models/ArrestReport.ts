import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";
import { IPenalCodes } from "./PenalCodes";
import { Flags } from "../types/Flags";

export interface IArrestReport extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characterId: ObjectId | ICharacter | string;
  characters: {
    characterId: ObjectId | ICharacter | string;
    involvement: string;
  }[];

  // EXTRA INFORMATION
  charges: IPenalCodes[];
  flags: Flags[];
  evidence: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IArrestReport>({
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
  characters: [
    {
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Characters",
        required: true,
      },
      involvement: String,
    },
  ],

  // EXTRA INFORMATION
  flags: Array,
  charges: Array,
  evidence: String,
  narrative: String,
  date: Date,
});

export const ArrestReportModel: Model<IArrestReport> =
  mongoose.models["Arrest Report"] ||
  mongoose.model<IArrestReport>("Arrest Report", schema);
