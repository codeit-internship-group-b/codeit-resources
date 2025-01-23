import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { type TeamType } from "@repo/types";
import { Team } from "../models/teamModel";

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: 팀 목록 가져오기
 *     description: 데이터베이스에 저장된 모든 팀을 가져옵니다. 팀은 `order` 필드 기준으로 정렬되어 반환됩니다.
 *     tags:
 *       - Teams
 *     responses:
 *       200:
 *         description: 성공적으로 팀 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: 팀의 고유 ID
 *                   name:
 *                     type: string
 *                     description: 팀 이름
 *                     example: "개발팀"
 *                   order:
 *                     type: number
 *                     description: 팀의 순서
 *                     example: 1
 *       500:
 *         description: 서버에서 팀 데이터를 가져오는 중 에러가 발생했습니다.
 */
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  const teams = await Team.find().sort({ order: 1 }).exec();
  res.status(200).send(teams);
};

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: 새로운 팀 생성
 *     description: 사용자가 요청한 팀 이름을 기반으로 새로운 팀을 생성합니다.
 *     tags:
 *       - Teams
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
 *                 example: "디자인팀"
 *     responses:
 *       201:
 *         description: 팀이 성공적으로 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "새로운 팀 디자인팀이 생성되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 생성된 팀의 고유 ID
 *                     name:
 *                       type: string
 *                       description: 생성된 팀의 이름
 *                       example: "디자인팀"
 *       400:
 *         description: 요청에 팀 이름이 포함되지 않았을 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "팀 이름은 필수 항목입니다."
 *       409:
 *         description: 동일한 이름의 팀이 이미 존재할 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "이미 존재하는 팀 이름 입니다."
 *       500:
 *         description: 서버 에러가 발생한 경우
 */
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
  res.status(201).send({ message: `새로운 팀 ${name}이 생성되었습니다.`, data: newTeam });
};

/**
 * @swagger
 * /teams/{teamId}:
 *   put:
 *     summary: 팀 이름 수정
 *     description: 특정 팀의 이름을 수정합니다.
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *           description: 수정할 팀의 고유 ID
 *           example: "64b8a1234c56d7890ef12345"
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
 *                 example: "백엔드팀"
 *     responses:
 *       200:
 *         description: 팀 이름이 성공적으로 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "팀 이름이 성공적으로 업데이트되었습니다."
 *       400:
 *         description: 요청이 잘못되었거나 유효하지 않은 팀 ID 또는 이름이 누락된 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   examples:
 *                     invalidId:
 *                       value: "유효하지 않은 팀 ID 입니다."
 *                     missingName:
 *                       value: "팀 이름은 필수 항목입니다."
 *       404:
 *         description: 지정된 팀 ID로 팀을 찾을 수 없을 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "팀을 찾을 수 없습니다."
 *       409:
 *         description: 동일한 이름의 팀이 이미 존재할 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "이미 존재하는 팀 이름 입니다."
 *       500:
 *         description: 서버 에러가 발생한 경우
 */
interface UpdateTeamNameRequest extends Request {
  params: {
    teamId: string;
  };
  body: {
    name: string;
  };
}

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

/**
 * @swagger
 * /teams/order:
 *   patch:
 *     summary: 팀 순서 업데이트
 *     description: 팀의 순서를 재정렬합니다. 클라이언트에서 정렬된 순서로 팀 배열을 전달해야 합니다.
 *     tags:
 *       - Teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedTeams:
 *                 type: array
 *                 description: 업데이트된 팀 배열 (새로운 순서 포함)
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 팀의 고유 ID
 *                       example: "64b8a1234c56d7890ef12345"
 *     responses:
 *       200:
 *         description: 팀 순서가 성공적으로 업데이트된 경우 반환됩니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "성공적으로 업데이트되었습니다."
 *                 teams:
 *                   type: array
 *                   description: 업데이트된 순서대로 정렬된 팀 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 팀의 고유 ID
 *                         example: "64b8a1234c56d7890ef12345"
 *                       name:
 *                         type: string
 *                         description: 팀 이름
 *                         example: "개발팀"
 *                       order:
 *                         type: number
 *                         description: 팀의 순서
 *                         example: 1
 *       400:
 *         description: 잘못된 요청 또는 팀 배열이 유효하지 않은 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   examples:
 *                     invalidRequest:
 *                       value: "잘못된 요청입니다."
 *                     teamCountMismatch:
 *                       value: "팀 개수가 일치하지 않습니다."
 *       500:
 *         description: 서버 에러가 발생한 경우
 */
interface UpdateTeamOrderRequest extends Request {
  body: {
    updatedTeams: TeamType[];
  };
}

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

/**
 * @swagger
 * /teams/{teamId}:
 *   delete:
 *     summary: 팀 삭제
 *     description: 주어진 팀 ID를 사용하여 팀을 삭제합니다.
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         description: 삭제할 팀의 고유 ID
 *         schema:
 *           type: string
 *           example: "64b8a1234c56d7890ef12345"
 *     responses:
 *       200:
 *         description: 팀이 성공적으로 삭제된 경우 반환됩니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "팀이 삭제되었습니다."
 *       404:
 *         description: 요청한 팀 ID에 해당하는 팀을 찾을 수 없는 경우 발생합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "해당 팀을 찾을 수 없습니다."
 *       500:
 *         description: 서버 에러가 발생한 경우
 */
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
