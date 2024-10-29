import { type IReservation, ReservationStatus } from "@repo/types/reservationType";
import { Schema, model, type Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const TEN_MIN_BUFFER = 10 * 60 * 1000;

const ReservationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    itemName: { type: String, required: true },
    itemType: { type: String, required: true },
    startAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, startAt: Date): boolean {
          const timeWithBuffer = new Date(new Date().getTime() - TEN_MIN_BUFFER);
          return startAt >= timeWithBuffer; // 예약 시간이 현재 시간 이후인지 확인(10분 여유)
        },
        message: "시작 시간은 10분 전까지 설정 가능합니다.",
      },
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, endAt: Date): boolean {
          return endAt > this.startAt; // 종료 시간이 시작 시간보다 이후여야 함
        },
        message: "종료 시간은 시작 시간 이후로 설정 가능합니다.",
      },
    },
    status: { type: String, enum: ReservationStatus, required: true },
    notes: { type: String },
    attendees: { type: [String] },
  },
  {
    timestamps: true,
  },
);
ReservationSchema.index({ status: 1, startAt: 1 });
ReservationSchema.index({ itemType: 1, startAt: 1 });

export const Reservation = model<IReservation>("Reservation", ReservationSchema);
