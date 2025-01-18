import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { Flags } from "../types/Flags";

export interface ICharacter extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  alive: boolean;
  pendingApproval: boolean;
  pendingChanges: boolean;
  changes: string | null;

  idCardImage: string;
  characterImage: string;

  firstName: string;
  lastName: string;
  backstory: string;
  age: number;
  dob: Date;
  expDate: Date;
  sex: "male" | "female";
  heightFt: number;
  heightIn: number;
  hair: string;
  weight: number;
  eyes: string;
  issueDate: Date;
  DD: string;
  address: string;
  flags: Flags[];
}

const schema = new Schema<ICharacter>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  alive: {
    type: Boolean,
    default: true,
    required: true,
  },
  pendingApproval: {
    type: Boolean,
    default: false,
    required: true,
  },
  pendingChanges: {
    type: Boolean,
    default: false,
    required: true,
  },
  changes: String,
  idCardImage: String,
  characterImage: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  backstory: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  heightFt: {
    type: Number,
    required: true,
  },
  heightIn: {
    type: Number,
    required: true,
  },
  hair: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  eyes: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  DD: {
    type: String,
    required: true,
  },
  address: String,
  flags: Array,
});

export const CharacterModel: Model<ICharacter> =
  mongoose.models["Characters"] ||
  mongoose.model<ICharacter>("Characters", schema);
