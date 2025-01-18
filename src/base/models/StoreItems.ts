import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IStoreItems extends Document {
  _id: ObjectId;
  itemName: string;
  itemPrice: number;
  itemType: string;
  itemCategory: string;
  itemDescription: string;
  allowPurchase: boolean;
  allowResale: boolean;
  itemImages: Array<string>;
}

const schema = new Schema<IStoreItems>({
  itemName: String,
  itemPrice: Number,
  itemType: String,
  itemCategory: String,
  itemDescription: String,
  allowPurchase: Boolean,
  allowResale: Boolean,
  itemImages: Array,
});

export const StoreItemsModel: Model<IStoreItems> =
  mongoose.models["Store Items"] ||
  mongoose.model<IStoreItems>("Store Items", schema);
