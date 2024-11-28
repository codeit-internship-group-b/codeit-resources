import { type TeamType } from "@repo/types/teamType";
import { type Document, model, Schema } from "mongoose";

export interface TeamDocument extends Omit<TeamType, "_id">, Document {}

const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, unique: true, required: true },
    order: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

TeamSchema.pre<TeamDocument>("save", async function (next) {
  if (this.isNew) {
    const lastTeam = await Team.findOne().sort({ order: -1 }).lean();
    this.order = lastTeam ? lastTeam.order + 1 : 0;
  }
  next();
});

export const Team = model<TeamDocument>("Team", TeamSchema);
