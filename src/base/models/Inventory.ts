import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";
import { IStoreItems } from "./StoreItems";
import { Flags } from "../types/Flags";

export interface IInventory extends Document {
  _id: ObjectId;
  accountId: ObjectId | IUser;
  itemId: ObjectId | IStoreItems | string;
  characterId: ObjectId | string;
  forSale: boolean;
  salePrice: number;
  saleDescription: string;
  dmvActivated: boolean;
  regStatus: string;
  expiration: Date;
  plate: string;
  color: string;
  serialNo: string;
  registryDate: Date;
  flags: Flags[];
}

const schema = new Schema<IInventory>({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accounts",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store Items",
    required: true,
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Characters",
  },
  forSale: {
    type: Boolean,
    default: false,
    required: true,
  },
  salePrice: Number,
  saleDescription: String,
  dmvActivated: {
    type: Boolean,
    default: false,
    required: true,
  },
  regStatus: String,
  expiration: Date,
  plate: String,
  color: String,
  serialNo: String,
  registryDate: Date,
  flags: Array,
});

export const InventoryModel: Model<IInventory> =
  mongoose.models["Owned Items"] ||
  mongoose.model<IInventory>("Owned Items", schema);
