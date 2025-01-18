import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface IFireIncident extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // EXTRA INFORMATION
  incidentLocation: string;
  incidentType: string;
  numOfTransported: string;
  numOfDeceased: string;
  numOfInjured: string;
  allPresentApparatus: string;
  apparatusYouWereOn: string;
  equipmentUsed: string;
  totalPersonnelOnScene: string;
  commandingUnit: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IFireIncident>({
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

  // EXTRA INFORMATION
  incidentLocation: String,
  incidentType: String,
  numOfTransported: String,
  numOfDeceased: String,
  numOfInjured: String,
  allPresentApparatus: String,
  apparatusYouWereOn: String,
  equipmentUsed: String,
  totalPersonnelOnScene: String,
  commandingUnit: String,
  narrative: String,
  date: Date,
});

export const FireIncidentModel: Model<IFireIncident> =
  mongoose.models["Fire Incident"] ||
  mongoose.model<IFireIncident>("Fire Incident", schema);
