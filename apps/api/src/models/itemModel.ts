import { type TBaseItem, type IRoom, type ISeat, type IEquipment, ItemStatus } from "@repo/types/src/itemType";
import { Schema, type Document, model } from "mongoose";

export interface ItemDoc extends Omit<TBaseItem, "_id">, Document {
  itemType: "room" | "seat" | "equipment";
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, trim: true },
    status: { type: String, enum: ItemStatus, required: true },
    description: { type: String, maxlength: 200, default: "" },
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
    discriminatorKey: "itemType",
    collection: "items",
  },
);

export const Item = model<ItemDoc>("Item", ItemSchema);

// Room 타입 하위 스키마
const RoomSchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  location: { type: String, default: "", trim: true },
  capacity: { type: Number, min: 1, required: true },
});
export const Room = Item.discriminator<IRoom>("Room", RoomSchema, "room");

// Seat 타입 하위 스키마
const SeatSchema: Schema = new Schema({});
export const Seat = Item.discriminator<ISeat>("Seat", SeatSchema, "seat");

// Equipment 타입 하위 스키마
const EquipmentSchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
});
export const Equipment = Item.discriminator<IEquipment>("Equipment", EquipmentSchema, "equipment");
