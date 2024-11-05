import { type Request, type Response } from "express";
import { Team } from "../models/teamModel";

interface GetTeamsRequest extends Request {
  query: {
    sortOption?: "newest" | "oldest" | "alphabetical";
  };
}

// Get all teams
export const getTeams = async (req: GetTeamsRequest, res: Response): Promise<void> => {
  const { sortOption = "newest" } = req.query;

  let query = Team.find();

  if (sortOption === "alphabetical") {
    query = query.sort({ name: 1 });
  } else if (sortOption === "oldest") {
    query = query.sort({ createdAt: 1 });
  } else {
    query = query.sort({ createdAt: -1 });
  }

  const teams = await query.exec();
  res.status(200).send(teams);
};
