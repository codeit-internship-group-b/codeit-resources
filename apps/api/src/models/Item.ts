import { IItem, ItemStatus, ItemTypes } from "@repo/types/items";
import mongoose, { Schema, Document } from "mongoose";

export interface ItemDoc extends Omit<IItem, "_id">, Document {}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ItemTypes, required: true }, // Discriminator key
    description: { type: String, required: true },
    status: { type: String, enum: ItemStatus, required: true },
    createdBy: { type: String, required: true },
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
    discriminatorKey: "type", // 이 필드 기준으로 하위 스키마 구분
    collection: "items", // 모든 아이템이 items 컬렉션에 저장됨
  },
);

// Room 타입 하위 스키마
export const Item = mongoose.model<IItem>("Item", ItemSchema);

interface IRoom extends IItem {
  location: string;
  tags?: string[];
  capacity?: number;
}

const RoomSchema: Schema = new Schema({
  location: { type: String },
  tags: { type: [String] },
  capacity: { type: Number },
});

export const Room = Item.discriminator<IRoom>("Room", RoomSchema);

// Seat 타입 하위 스키마
interface ISeat extends IItem {
  tags?: string[];
}

const SeatSchema: Schema = new Schema({
  tags: { type: [String] },
});

export const Seat = Item.discriminator<ISeat>("Seat", SeatSchema);

// Equipment 타입 하위 스키마
interface IEquipment extends IItem {
  tags?: string[];
}

const EquipmentSchema: Schema = new Schema({
  tags: { type: [String] },
});

export const Equipment = Item.discriminator<IEquipment>("Equipment", EquipmentSchema);
