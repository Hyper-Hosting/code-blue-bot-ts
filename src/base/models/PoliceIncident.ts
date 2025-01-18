import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";

export interface IPoliceIncident extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characters: {
    characterId: ObjectId | ICharacter | string;
    involvement: string;
  }[];

  // EXTRA INFORMATION
  incidentType: string;
  incidentLocation: string;
  locationType: string;
  locationName: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IPoliceIncident>({
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
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Characters",
        required: true,
      },
      involvement: String,
    },
  ],

  // EXTRA INFORMATION
  incidentType: String,
  incidentLocation: String,
  locationType: String,
  locationName: String,
  narrative: String,
  date: Date,
});

export const PoliceIncidentModel: Model<IPoliceIncident> =
  mongoose.models["Police Incident"] ||
  mongoose.model<IPoliceIncident>("Police Incident", schema);
