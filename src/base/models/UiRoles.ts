import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IUiRoles extends Document {
  _id: ObjectId;
  userId: string;
  roles: string[];
}

const schema = new Schema<IUiRoles>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  roles: Array,
});

export const UiRolesModel: Model<IUiRoles> =
  mongoose.models["UI Roles"] || mongoose.model<IUiRoles>("UI Roles", schema);
