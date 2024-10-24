import { type TBaseItem, type IRoom, type ISeat, type IEquipment, ItemStatus } from "@repo/types/src/itemType";
import { Schema, type Document, model } from "mongoose";

export interface ItemDoc extends Omit<TBaseItem, "_id">, Document {}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 200 },
    status: { type: String, enum: ItemStatus, required: true },
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
    discriminatorKey: "type", // 이 필드 기준으로 하위 스키마 구분
    collection: "items", // 모든 아이템이 items 컬렉션에 저장됨
  },
);

export const Item = model("Item", ItemSchema);

// Room 타입 하위 스키마

const RoomSchema: Schema = new Schema({
  type: { type: String, default: "room", required: true },
  category: { type: String, required: true, ref: "Category", default: "기타" },
  capacity: { type: Number },
  location: { type: String },
});

export const Room = Item.discriminator<IRoom>("Room", RoomSchema);

// Seat 타입 하위 스키마
const SeatSchema: Schema = new Schema({
  type: { type: String, default: "seat", required: true },
  userName: { type: String, ref: "User" },
});

export const Seat = Item.discriminator<ISeat>("Seat", SeatSchema);

// Equipment 타입 하위 스키마
const EquipmentSchema: Schema = new Schema({
  type: { type: String, default: "equipment", required: true },
  category: { type: String, required: true, ref: "Category", default: "기타" },
});

export const Equipment = Item.discriminator<IEquipment>("Equipment", EquipmentSchema);
