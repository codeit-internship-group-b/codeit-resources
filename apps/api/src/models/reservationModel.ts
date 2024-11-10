import { type IReservation, ReservationStatus } from "@repo/types/reservationType";
import { Schema, model, type Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const TEN_MIN_BUFFER = 10 * 60 * 1000;

const ReservationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    item: { type: Schema.Types.ObjectId, required: true, ref: "Item" },
    itemType: { type: String, enum: ["room", "seat", "equipment"], required: true },
    startAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, startAt: Date): boolean {
          if (this.status === "reserved" || this.itemType !== "seat") {
            const timeWithBuffer = new Date(new Date().getTime() - TEN_MIN_BUFFER);
            return startAt >= timeWithBuffer;
          } // 예약 시간이 현재 시간 이후인지 확인(10분 여유)
          return true;
        },
        message: "시작 시간은 10분 전까지 설정 가능합니다.",
      },
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, endAt: Date): boolean {
          if (this.status === "reserved") {
            return endAt > this.startAt;
          }
          // 종료 시간이 시작 시간보다 이후여야 함
          return true;
        },
        message: "종료 시간은 시작 시간 이후로 설정 가능합니다.",
      },
    },
    status: { type: String, enum: ReservationStatus, required: true },
    notes: { type: String },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
);
ReservationSchema.index({ status: 1, startAt: 1 });
ReservationSchema.index({ itemType: 1, startAt: 1 });

export const Reservation = model<IReservation>("Reservation", ReservationSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         item:
 *           $ref: '#/components/schemas/Item'
 *         itemType:
 *           type: string
 *           enum: ["room", "seat", "equipment"]
 *           description: 예약된 아이템의 타입
 *           example: "room"
 *         startAt:
 *           type: string
 *           format: date-time
 *           description: 예약 시작 시간
 *           example: "2024-10-31T10:00:00Z"
 *         endAt:
 *           type: string
 *           format: date-time
 *           description: 예약 종료 시간
 *           example: "2024-10-31T12:00:00Z"
 *         status:
 *           type: string
 *           enum: [reserved, canceled, completed]
 *           description: 예약 상태
 *           example: "reserved"
 *         notes:
 *           type: string
 *           description: 예약에 대한 추가 메모
 *           example: "회의실 예약"
 *         attendees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *       required:
 *         - user
 *         - item
 *         - itemType
 *         - startAt
 *         - endAt
 *         - status
 *       additionalProperties: false
 */
