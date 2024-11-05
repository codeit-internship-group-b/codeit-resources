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

interface CreateTeamRequest extends Request {
  body: {
    name: string;
  };
}

export const createTeam = async (req: CreateTeamRequest, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "팀 이름은 필수 항목입니다." });
    return;
  }

  const existingTeam = await Team.findOne({ name });
  if (existingTeam) {
    res.status(409).send({ message: "이미 존재하는 팀 이름 입니다." });
    return;
  }

  const newTeam = new Team({ name });

  await newTeam.save();
  res.status(201).send({ message: `새로운 팀 ${name}이 생성되었습니다.`, newTeam });
};

interface UpdateTeamRequest extends Request {
  params: {
    teamId: string;
  };
  body: {
    name: string;
  };
}

export const updateTeam = async (req: UpdateTeamRequest, res: Response): Promise<void> => {
  const { teamId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "팀 이름은 필수 항목입니다." });
    return;
  }

  const team = await Team.findById(teamId);

  if (!team) {
    res.status(404).send({ message: "팀을 찾을 수 없습니다." });
    return;
  }

  const existingTeam = await Team.findOne({ name, _id: { $ne: teamId } });
  if (existingTeam) {
    res.status(409).send({ message: "이미 존재하는 팀 이름 입니다." });
    return;
  }

  await Team.findByIdAndUpdate(teamId, { name }, { new: true });
  res.status(200).send({ message: "팀 이름이 성공적으로 업데이트되었습니다." });
};

interface DeleteTeamRequest extends Request {
  params: {
    teamId: string;
  };
}

export const deleteTeam = async (req: DeleteTeamRequest, res: Response): Promise<void> => {
  const { teamId } = req.params;
  const deletedTeam = await Team.findByIdAndDelete(teamId);

  if (!deletedTeam) {
    res.status(404).send({ message: "해당 팀을 찾을 수 없습니다." });
    return;
  }

  res.status(200).send({ message: "팀이 삭제되었습니다." });
};
