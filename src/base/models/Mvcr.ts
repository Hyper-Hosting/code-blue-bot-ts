import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface IMvcr extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // VEHICLE INFORMATION
  plate: string;
  vehicleName: string;
  vehicleExp: Date;
  color: string;
  regStatus: string;

  // EXTRA INFORMATION
  numOfVehilcesInvolved: string;
  civilianInvolved: string;
  officerInvolved: string;
  numOfInvolvedPeople: string;
  numOfInjuries: string;
  numOfFatalities: string;
  estimatedDamages: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IMvcr>({
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

  // VEHICLE INFORMATION
  plate: String,
  vehicleName: String,
  vehicleExp: Date,
  color: String,
  regStatus: String,

  // EXTRA INFORMATION
  date: Date,
  numOfVehilcesInvolved: String,
  civilianInvolved: String,
  officerInvolved: String,
  numOfInvolvedPeople: String,
  numOfInjuries: String,
  numOfFatalities: String,
  estimatedDamages: String,
  narrative: String,
});

export const MvcrModel: Model<IMvcr> =
  mongoose.models["MVCR"] || mongoose.model<IMvcr>("MVCR", schema);
