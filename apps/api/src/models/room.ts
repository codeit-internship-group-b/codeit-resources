import { IItem } from "@repo/types/items";
import mongoose, { Schema, Document } from "mongoose";

interface IRoom extends Omit<IItem, "_id">, Document {}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
