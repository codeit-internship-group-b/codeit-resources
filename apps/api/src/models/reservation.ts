import { type IReservation, ReservationStatus } from "@repo/types";
import { Schema, model, type Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const ReservationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ReservationStatus, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Reservation = model<IReservation>("Reservation", ReservationSchema);
