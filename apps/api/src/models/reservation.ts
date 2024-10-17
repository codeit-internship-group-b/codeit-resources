import { IReservation } from "@repo/types/reservations";
import mongoose, { Schema, Document } from "mongoose";

export interface ReservationDoc extends Omit<IReservation, "_id">, Document {}

const ReservationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  notes: { type: String },
});

export const Reservation = mongoose.model<IReservation>("Reservation", ReservationSchema);
