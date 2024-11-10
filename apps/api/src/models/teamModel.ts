import { type ITeam } from "@repo/types/teamType";
import { type Document, model, Schema } from "mongoose";

interface TeamDocument extends Omit<ITeam, "_id">, Document {}

const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

export const Team = model<TeamDocument>("Team", TeamSchema);
