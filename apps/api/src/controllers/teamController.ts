import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { Team } from "../models/teamModel";

interface GetTeamsRequest extends Request {
  query: {
    sortOption?: "newest" | "oldest" | "alphabetical";
  };
}

/**
 * @swagger
 * /teams:
 *   get:
 *     tags: [Teams]
 *     summary: 모든 팀 조회
 *     description: 필터링 및 정렬 옵션을 사용하여 모든 팀을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: sortOption
 *         schema:
 *           type: string
 *           enum: [newest, oldest, alphabetical]
 *         description: 정렬 옵션을 선택합니다.
 *     responses:
 *       200:
 *         description: 팀 목록이 성공적으로 반환되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
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

/**
 * @swagger
 * /teams:
 *   post:
 *     tags: [Teams]
 *     summary: 새로운 팀 생성
 *     description: 새로운 팀을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 팀 이름
 *                 example: "Development Team"
 *     responses:
 *       201:
 *         description: 새로운 팀이 생성되었습니다.
 *       400:
 *         description: 팀 이름이 제공되지 않았습니다.
 *       409:
 *         description: 이미 존재하는 팀 이름입니다.
 */
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
  res.status(201).send({ message: `새로운 팀 ${name}이 생성되었습니다.`, data: newTeam });
};

interface UpdateTeamRequest extends Request {
  params: {
    teamId: string;
  };
  body: {
    name: string;
  };
}

/**
 * @swagger
 * /teams/{teamId}:
 *   put:
 *     tags: [Teams]
 *     summary: 팀 정보 업데이트
 *     description: 팀 ID를 사용하여 팀 이름을 업데이트합니다.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: 업데이트할 팀 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 새로운 팀 이름
 *                 example: "Updated Team Name"
 *     responses:
 *       200:
 *         description: 팀 이름이 성공적으로 업데이트되었습니다.
 *       400:
 *         description: 팀 이름이 제공되지 않았습니다.
 *       404:
 *         description: 팀을 찾을 수 없습니다.
 *       409:
 *         description: 이미 존재하는 팀 이름입니다.
 */
export const updateTeam = async (req: UpdateTeamRequest, res: Response): Promise<void> => {
  const { teamId } = req.params;
  const { name } = req.body;

  if (!Types.ObjectId.isValid(teamId)) {
    res.status(400).send({ message: "유효하지 않은 팀 ID 입니다." });
    return;
  }

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

/**
 * @swagger
 * /teams/{teamId}:
 *   delete:
 *     tags: [Teams]
 *     summary: 팀 삭제
 *     description: 팀 ID를 사용하여 팀을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 팀 ID
 *     responses:
 *       200:
 *         description: 팀이 삭제되었습니다.
 *       404:
 *         description: 팀을 찾을 수 없습니다.
 */
export const deleteTeam = async (req: DeleteTeamRequest, res: Response): Promise<void> => {
  const { teamId } = req.params;
  const deletedTeam = await Team.findByIdAndDelete(teamId);

  if (!deletedTeam) {
    res.status(404).send({ message: "해당 팀을 찾을 수 없습니다." });
    return;
  }

  res.status(200).send({ message: "팀이 삭제되었습니다." });
};
