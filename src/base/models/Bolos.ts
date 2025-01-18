import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";
import { IPenalCodes } from "./PenalCodes";
import { Flags } from "../types/Flags";

export interface IBolos extends Document {
  _id: ObjectId;

  // OFFICER INFORMATION
  officerAccountId: ObjectId | IUser | string;
  officerName: string;
  officerDepartment: string;
  officerCallsign: string;
  officerRank: string;

  // CIVILIAN INFORMATION
  characterId: ObjectId | ICharacter | string;

  // VEHICLE INFORMATION
  plate: string;
  vehicleName: string;
  vehicleExp: Date;
  color: string;
  regStatus: string;

  // TICKET INFORMATION
  charges: IPenalCodes[];
  date: Date;
  flags: Flags[];
  narrative: string;
  boloStatus: "Active" | "Closed";
}

const schema = new Schema<IBolos>({
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

  // VEHICLE INFORMATION
  plate: String,
  vehicleName: String,
  vehicleExp: Date,
  color: String,
  regStatus: String,

  // CHARGE INFORMATION
  charges: Array,
  date: Date,
  flags: Array,
  narrative: String,
  boloStatus: String,
});

export const BolosModel: Model<IBolos> =
  mongoose.models["Bolos"] || mongoose.model<IBolos>("Bolos", schema);
