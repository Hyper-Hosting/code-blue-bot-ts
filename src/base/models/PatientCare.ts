import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { ICharacter } from "./Character";

export interface IPatientCare extends Document {
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
  technician: string;
  driver: string;
  additionalCrew: string;
  dateOfIncident: Date;
  dispatchedTime: string;
  enrouteTime: string;
  onSceneTime: string;
  transportingTime: string;
  transportArrivedTime: string;
  availableTime: string;
  callType: string;
  careLevel: string;
  response: string;
  postal: string;
  address: string;
  presentationOfPatient: string;
  heartRate: string;
  bloodPressure: string;
  oxygenSaturation: string;
  respritoryRate: string;
  bloodGlucose: string;
  tempature: string;
  treatmentsPreformed: string;
  allergies: string;
  medications: string;
  pastMedicalHistory: string;
  carryingDeviceUsed: string;
  responseLevel: string;
  facilityTransportedTo: string;
  narrative: string;
  date: Date;
}

const schema = new Schema<IPatientCare>({
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
  technician: String,
  driver: String,
  additionalCrew: String,
  dateOfIncident: Date,
  dispatchedTime: String,
  enrouteTime: String,
  onSceneTime: String,
  transportingTime: String,
  transportArrivedTime: String,
  availableTime: String,
  callType: String,
  careLevel: String,
  response: String,
  postal: String,
  address: String,
  presentationOfPatient: String,
  heartRate: String,
  bloodPressure: String,
  oxygenSaturation: String,
  respritoryRate: String,
  bloodGlucose: String,
  tempature: String,
  treatmentsPreformed: String,
  allergies: String,
  medications: String,
  pastMedicalHistory: String,
  carryingDeviceUsed: String,
  responseLevel: String,
  facilityTransportedTo: String,
  narrative: String,
  date: Date,
});

export const PatientCareModel: Model<IPatientCare> =
  mongoose.models["Patient Care"] ||
  mongoose.model<IPatientCare>("Patient Care", schema);
