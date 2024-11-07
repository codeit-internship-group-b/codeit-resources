import { type TBaseItem, type IRoom, type ISeat, type IEquipment, ItemStatus } from "@repo/types/src/itemType";
import { Schema, type Document, model } from "mongoose";

export interface ItemDoc extends Omit<TBaseItem, "_id">, Document {
  itemType: "room" | "seat" | "equipment";
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: 아이템 ID
 *         name:
 *           type: string
 *           description: 아이템 이름
 *           example: "회의실 101"
 *         status:
 *           type: string
 *           description: 아이템 상태
 *           example: "available"
 *         description:
 *           type: string
 *           description: 아이템 설명
 *           example: "10명 수용 가능한 회의실"
 *         imageUrl:
 *           type: string
 *           description: 아이템 이미지 URL
 *           example: "http://example.com/item.jpg"
 *         itemType:
 *           type: string
 *           required: true
 *           enum: ["room", "seat", "equipment"]
 *           description: 아이템 타입
 *           example: "room"
 */
const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, trim: true, unique: true },
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
/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       allOf:
 *         - $ref: '#/components/schemas/Item'
 *         - type: object
 *           properties:
 *             category:
 *               $ref: '#/components/schemas/Category'
 *             location:
 *               type: string
 *               description: 방 위치
 *               example: "1층 회의실"
 *             capacity:
 *               type: integer
 *               description: 수용 인원
 *               example: 10
 */
const RoomSchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  location: { type: String, default: "", trim: true },
  capacity: { type: Number, min: 1, required: true },
});
export const Room = Item.discriminator<IRoom>("Room", RoomSchema, "room");

// Seat 타입 하위 스키마
/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       allOf:
 *         - $ref: '#/components/schemas/Item'
 *         - type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 */
const SeatSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
export const Seat = Item.discriminator<ISeat>("Seat", SeatSchema, "seat");

// Equipment 타입 하위 스키마
/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       allOf:
 *         - $ref: '#/components/schemas/Item'
 *         - type: object
 *           properties:
 *             category:
 *               $ref: '#/components/schemas/Category'
 */
const EquipmentSchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
});
export const Equipment = Item.discriminator<IEquipment>("Equipment", EquipmentSchema, "equipment");

RoomSchema.index({ category: 1, name: 1 });
EquipmentSchema.index({ category: 1, name: 1 });
