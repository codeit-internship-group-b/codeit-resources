import { type IItem, ItemStatus, ItemTypes } from "@repo/types/src/itemType";
import { Schema, type Document, model } from "mongoose";

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
export const Item = model<IItem>("Item", ItemSchema);

interface Room extends IItem {
  category: string;
  location: string;
  tags?: string[];
  capacity?: number;
}

const RoomSchema: Schema = new Schema({
  type: { type: String, default: "room", required: true },
  category: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String },
  tags: { type: [String] },
});

export const Room = Item.discriminator<Room>("Room", RoomSchema);

// Seat 타입 하위 스키마
interface Seat extends IItem {
  tags?: string[];
}

const SeatSchema: Schema = new Schema({
  type: { type: String, default: "seat", required: true },
  tags: { type: [String] },
});

export const Seat = Item.discriminator<Seat>("Seat", SeatSchema);

// Equipment 타입 하위 스키마
interface Equipment extends IItem {
  category: string;
  tags?: string[];
}

const EquipmentSchema: Schema = new Schema({
  type: { type: String, default: "equipment", required: true },
  category: { type: String, required: true },
  tags: { type: [String] },
});

export const Equipment = Item.discriminator<Equipment>("Equipment", EquipmentSchema);
