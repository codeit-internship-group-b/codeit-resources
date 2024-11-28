import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { type TeamType } from "@repo/types";
import { Team } from "../models/teamModel";

/**
 * @swagger
 * /teams:
 *   get:
 *     tags: [Teams]
 *     summary: 모든 팀 조회
 *     description: 팀의 순서를 기준으로 정렬된 모든 팀을 조회합니다.
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
 *                     description: 팀 ID
 *                   name:
 *                     type: string
 *                     description: 팀 이름
 *                   order:
 *                     type: number
 *                     description: 팀 순서
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 생성 날짜
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 업데이트 날짜
 */
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  const teams = await Team.find().sort({ order: 1 }).exec();
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
 *     description: 주어진 이름으로 새로운 팀을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 생성할 팀 이름
 *                 example: "Development Team"
 *     responses:
 *       201:
 *         description: 새로운 팀이 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 생성된 팀 ID
 *                     name:
 *                       type: string
 *                       description: 팀 이름
 *                     order:
 *                       type: number
 *                       description: 팀 순서
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 생성 날짜
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 업데이트 날짜
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

interface UpdateTeamNameRequest extends Request {
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
 *     summary: 팀 이름 업데이트
 *     description: 주어진 팀 ID와 새 이름으로 팀 이름을 업데이트합니다.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: 업데이트할 팀의 ID
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
 *         description: 잘못된 요청입니다 (예: 유효하지 않은 ID 또는 누락된 이름).
 *       404:
 *         description: 해당 팀을 찾을 수 없습니다.
 *       409:
 *         description: 이미 존재하는 팀 이름입니다.
 */
export const updateTeamName = async (req: UpdateTeamNameRequest, res: Response): Promise<void> => {
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

interface UpdateTeamOrderRequest extends Request {
  body: {
    updatedTeams: TeamType[];
  };
}

/**
 * @swagger
 * /teams/order:
 *   patch:
 *     tags: [Teams]
 *     summary: 팀 순서 업데이트
 *     description: 주어진 순서에 따라 팀의 순서를 업데이트합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedTeams:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 팀 ID
 *                     order:
 *                       type: number
 *                       description: 새로운 순서
 *     responses:
 *       200:
 *         description: 팀 순서가 성공적으로 업데이트되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 팀 ID
 *                       name:
 *                         type: string
 *                         description: 팀 이름
 *                       order:
 *                         type: number
 *                         description: 팀 순서
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 생성 날짜
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 업데이트 날짜
 *       400:
 *         description: 잘못된 요청입니다 (예: 팀 수가 일치하지 않음).
 */
export const updateTeamOrder = async (req: UpdateTeamOrderRequest, res: Response): Promise<void> => {
  const { updatedTeams } = req.body;

  if (!Array.isArray(updatedTeams)) {
    res.status(400).json({ message: "잘못된 요청입니다." });
    return;
  }

  const teams = await Team.find().sort({ order: 1 }).lean();
  if (teams.length !== updatedTeams.length) {
    res.status(400).json({ message: "팀 개수가 일치하지 않습니다." });
    return;
  }

  const bulkOperations = updatedTeams.map((updatedTeam, index) => ({
    updateOne: {
      filter: { _id: updatedTeam._id },
      update: { $set: { order: index } },
    },
  }));

  await Team.bulkWrite(bulkOperations);
  const reorderedTeams = await Team.find().sort({ order: 1 }).lean();

  res.status(200).send({
    message: "성공적으로 업데이트되었습니다.",
    teams: reorderedTeams,
  });
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
 *     description: 주어진 팀 ID로 팀을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 팀의 ID
 *     responses:
 *       200:
 *         description: 팀이 성공적으로 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *       404:
 *         description: 해당 팀을 찾을 수 없습니다.
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
