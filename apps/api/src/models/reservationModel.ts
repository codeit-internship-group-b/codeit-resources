import { type IReservation, ReservationStatus } from "@repo/types/reservationType";
import { Schema, model, type Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const ReservationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: IReservation, value: Date): boolean {
          return value > this.startAt;
        },
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

export const Reservation = model<IReservation>("Reservation", ReservationSchema);
