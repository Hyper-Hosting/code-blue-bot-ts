import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";

export interface IArsonInvestigation extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characters: (ObjectId | ICharacter | string)[];

  // EXTRA INFORMATION
  dispatchedTime: string;
  enrouteTime: string;
  onSceneTime: string;
  clearOfCallTime: string;
  unitsResponsed: string;
  dateOfIncident: Date;
  postal: string;
  address: string;
  fireType: string;
  buildingType: string;
  suspectedOrigin: string[];
  accelerantsUsed: string;
  accelerantsUsedExplaination: string;
  evidenceCollected: string;
  victimsInvolved: string;
  numOfVictims: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IArsonInvestigation>({
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
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Characters",
      required: true,
    },
  ],

  // EXTRA INFORMATION
  dispatchedTime: String,
  enrouteTime: String,
  onSceneTime: String,
  clearOfCallTime: String,
  unitsResponsed: String,
  dateOfIncident: Date,
  postal: String,
  address: String,
  fireType: String,
  buildingType: String,
  suspectedOrigin: Array,
  accelerantsUsed: String,
  accelerantsUsedExplaination: String,
  evidenceCollected: String,
  victimsInvolved: String,
  numOfVictims: String,
  narrative: String,
  date: Date,
});

export const ArsonInvestigationModel: Model<IArsonInvestigation> =
  mongoose.models["Arson Investigation"] ||
  mongoose.model<IArsonInvestigation>("Arson Investigation", schema);
