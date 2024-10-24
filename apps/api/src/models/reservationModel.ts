import { type IReservation, ReservationStatus } from "@repo/types/reservationType";
import { Schema, model, type Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const TEN_MIN_BUFFER = 10 * 60 * 1000;

const ReservationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    startAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, startAt: Date) {
          // 10분정도 여유 둬서 애매하게 기다리지 않도록
          const timeWithBuffer = new Date(new Date().getTime() - TEN_MIN_BUFFER);
          return startAt >= timeWithBuffer;
        },
        message: "시작 시간은 10분 전 이후로 설정 가능합니다.",
      },
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: ReservationDoc, endAt: Date) {
          return endAt > this.startAt;
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
ReservationSchema.index({ startAt: 1 });
ReservationSchema.index({ status: 1, startAt: 1 });
ReservationSchema.index({ type: 1, startAt: 1 });

export const Reservation = model<IReservation>("Reservation", ReservationSchema);
