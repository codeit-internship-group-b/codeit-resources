import { type Request, type Response } from "express";
import { Roles, type IUser, type TRole } from "@repo/types";
import { config } from "dotenv";
import { compare } from "bcryptjs";
import { PAGE_SIZE } from "@repo/constants";
import { User } from "../models/userModel";
import { areArraysEqual } from "../utils/areArraysEqual";
import { buildFilters } from "../utils/buildFilters";
import { getSortCriteria } from "../utils/getSortCriteria";
import { formatPaginatedResponse } from "../utils/formatPaginatedResponse";
import { fetchUsers } from "../utils/fetchUsers";
import { type GetUsersRequest } from "../types";

config();

// Get all users
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: 모든 사용자 조회
 *     description: 필터링 및 정렬 옵션을 사용하여 모든 사용자를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: 사용자의 역할로 필터링합니다.
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         description: 팀으로 필터링합니다.
 *       - in: query
 *         name: sortOption
 *         schema:
 *           type: string
 *           enum: [newest, oldest, alphabetical]
 *         description: 정렬 옵션을 선택합니다.
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: 다음 페이지 조회를 위한 커서 ID
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 이름, 이메일로 검색합니다.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 사용자 ID
 *                       name:
 *                         type: string
 *                         description: 사용자 이름
 *                       email:
 *                         type: string
 *                         description: 사용자 이메일
 *                       role:
 *                         type: string
 *                         description: 사용자 역할
 *                       teams:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: 사용자가 속한 팀
 *                       profileImage:
 *                         type: string
 *                         description: 프로필 이미지 URL
 *                 nextCursor:
 *                   type: string
 *                   nullable: true
 *                   description: 다음 페이지가 있는 경우 다음 페이지의 첫 번째 아이템 ID
 *       400:
 *         description: 잘못된 요청 파라미터입니다.
 */

export const getUsers = async (req: GetUsersRequest, res: Response): Promise<void> => {
  const filters = buildFilters({ query: req.query });
  const sortCriteria = getSortCriteria({ sortOption: req.query.sortOption });
  const users = await fetchUsers({
    filters,
    sortCriteria,
    pageSize: PAGE_SIZE,
  });
  const response = formatPaginatedResponse({
    members: users,
    pageSize: PAGE_SIZE,
  });
  res.status(200).json(response);
};

interface GetUserRequest extends Request {
  user?: IUser;
}

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: 사용자 ID로 사용자 조회
 *     description: 주어진 사용자 ID로 사용자의 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: 사용자 ID
 *                 name:
 *                   type: string
 *                   description: 사용자 이름
 *                 email:
 *                   type: string
 *                   description: 사용자 이메일
 *                 role:
 *                   type: string
 *                   description: 사용자 역할
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 사용자가 속한 팀
 *                 profileImage:
 *                   type: string
 *                   description: 프로필 이미지 URL
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 */
export const getUser = async (req: GetUserRequest, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  res.status(200).send(user);
};

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role?: TRole;
    teams?: string[];
  };
  file?: Express.Multer.File | Express.MulterS3.File;
}

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: 새로운 사용자 생성
 *     description: 새로운 사용자를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 사용자 이름
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *               role:
 *                 type: string
 *                 description: 사용자 역할
 *                 default: member
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 사용자가 속할 팀
 *     responses:
 *       201:
 *         description: 새로운 사용자가 생성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 생성된 사용자 ID
 *                     name:
 *                       type: string
 *                       description: 생성된 사용자 이름
 *                     email:
 *                       type: string
 *                       description: 생성된 사용자 이메일
 *                     role:
 *                       type: string
 *                       description: 생성된 사용자 역할
 *                     teams:
 *                       type: array
 *                       items:
 *                         type: string
 *                     profileImage:
 *                       type: string
 *                       description: 프로필 이미지 URL
 *       400:
 *         description: 이름 또는 이메일이 누락되었습니다.
 *       409:
 *         description: 이미 존재하는 이메일입니다.
 */
export const createUser = async (req: CreateUserRequest, res: Response): Promise<void> => {
  const { name, email, role, teams } = req.body;

  if (!name || !email) {
    res.status(400).send({ message: "이름, 이메일은 필수 항목입니다." });
    return;
  }

  const existingUser = await User.exists({ email });
  if (existingUser) {
    res.status(409).send({ message: "이미 존재하는 이메일입니다." });
    return;
  }

  if (Array.isArray(teams) && teams.length > 3) {
    res.status(400).send({ message: "팀은 최대 3개까지 추가 가능합니다." });
    return;
  }

  const profileImageUrl = req.file
    ? (req.file as Express.MulterS3.File).location
    : process.env.DEFAULT_PROFILE_IMAGE_URL;

  const user = new User({
    role: role ?? "member",
    name,
    email,
    password: 1234,
    teams,
    profileImage: profileImageUrl,
  });

  await user.save();
  res.status(201).send({ message: "새로운 사용자가 생성되었습니다.", user });
};

interface UserFields {
  name: string;
  email: string;
  role?: TRole;
  teams?: string[];
  profileImage?: string;
}

interface UpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: UserFields;
  file?: Express.Multer.File | Express.MulterS3.File;
}

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: 사용자 정보 업데이트
 *     description: 주어진 사용자 ID로 사용자의 정보를 업데이트합니다. 기존 값과 새 값을 비교하여 변경된 데이터만 업데이트합니다. 변경사항이 없을 경우 400 에러를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 업데이트할 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 새로운 사용자 이름
 *               email:
 *                 type: string
 *                 description: 새로운 사용자 이메일
 *               role:
 *                 type: string
 *                 description: 새로운 사용자 역할 (admin 또는 member)
 *                 enum: [admin, member]
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 사용자가 속할 팀 (최대 3개)
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: 새로운 프로필 이미지 파일
 *     responses:
 *       200:
 *         description: 사용자 정보가 성공적으로 업데이트되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 요청이 잘못되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 변경사항이 없습니다.
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 *       409:
 *         description: 중복된 이메일로 인해 업데이트할 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 이미 존재하는 이메일입니다.
 */
export const updateUser = async (req: UpdateUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { email, teams = [], name, role } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  if (email && email !== user.email) {
    const emailExists = await User.exists({ email });
    if (emailExists) {
      res.status(409).send({ message: "이미 존재하는 이메일입니다." });
      return;
    }
  }

  if (teams.length > 3) {
    res.status(400).send({ message: "팀은 최대 3개까지 추가 가능합니다." });
    return;
  }

  if (role && !Roles.includes(role)) {
    res.status(400).send({ message: "유효하지 않은 역할입니다." });
    return;
  }

  const updateFields: Partial<typeof req.body> = {};

  if (email && email !== user.email) updateFields.email = email;
  if (!areArraysEqual(teams, user.teams)) {
    updateFields.teams = teams;
  }
  if (name && name !== user.name) updateFields.name = name;
  if (role && role !== user.role) updateFields.role = role;
  if (req.file) {
    const profileImageUrl = (req.file as Express.MulterS3.File).location;
    updateFields.profileImage = profileImageUrl;
  }

  if (Object.keys(updateFields).length === 0) {
    res.status(400).send({ message: "변경사항이 없습니다." });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true });
  res.status(200).send({
    message: "사용자 정보가 성공적으로 업데이트되었습니다.",
    user: updatedUser,
  });
};

interface DeleteUserRequest extends Request {
  params: {
    userId: string;
  };
}

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: 사용자 삭제
 *     description: 주어진 사용자 ID로 사용자를 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자가 성공적으로 삭제되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자가 삭제되었습니다.
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 */
export const deleteUser = async (req: DeleteUserRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  res.status(200).send({ message: "사용자가 삭제되었습니다." });
};

interface UpdateProfileImageRequest extends Request {
  user?: IUser;
  file?: Express.Multer.File | Express.MulterS3.File;
}

/**
 * @swagger
 * /users/me/image:
 *   patch:
 *     tags:
 *       - Users
 *     summary: 프로필 사진 업데이트
 *     description: 현재 사용자의 프로필 사진을 업데이트합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 새로운 프로필 이미지 파일
 *     responses:
 *       200:
 *         description: 프로필 사진이 성공적으로 업데이트되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 프로필 사진이 변경되었습니다.
 *       400:
 *         description: 사진이 누락되었거나 인증 토큰이 유효하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사진이 누락되었습니다.
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 */
export const updateProfileImage = async (req: UpdateProfileImageRequest, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const profileImageUrl = (req.file as Express.MulterS3.File).location;

  if (!userId) {
    res.status(400).send({ message: "인증 토큰이 유효하지 않습니다." });
    return;
  }

  if (!profileImageUrl) {
    res.status(400).send({ message: "사진이 누락되었습니다." });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  await User.findByIdAndUpdate(userId, { profileImage: profileImageUrl });
  res.status(200).send({ message: "프로필 사진이 변경되었습니다." });
};

interface UpdateUserCredentialsRequest extends Request {
  user?: IUser;
  body: {
    currentPassword: string;
    newPassword: string;
  };
}

/**
 * @swagger
 * /users/credentials:
 *   patch:
 *     tags:
 *       - Users
 *     summary: 사용자 비밀번호 변경
 *     description: 현재 사용자의 비밀번호를 새 비밀번호로 변경합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: 현재 비밀번호
 *                 example: currentPassword123
 *               newPassword:
 *                 type: string
 *                 description: 새 비밀번호
 *                 example: newPassword456
 *     responses:
 *       200:
 *         description: 비밀번호가 성공적으로 변경되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 비밀번호가 변경되었습니다.
 *       400:
 *         description: 요청이 잘못되었습니다. (비밀번호 누락 또는 기존 비밀번호와 동일)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     missingPassword:
 *                       value: 비밀번호를 입력해 주세요.
 *                     samePassword:
 *                       value: 기존의 비밀번호와 동일합니다.
 *       401:
 *         description: 인증 오류 또는 비밀번호 불일치
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     invalidToken:
 *                       value: 인증 토큰이 유효하지 않습니다.
 *                     passwordMismatch:
 *                       value: 비밀번호가 일치하지 않습니다.
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 */
export const updateUserCredentials = async (req: UpdateUserCredentialsRequest, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    res.status(401).send({ message: "인증 토큰이 유효하지 않습니다." });
    return;
  }

  if (!currentPassword || !newPassword) {
    res.status(400).send({ message: "비밀번호를 입력해 주세요." });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    return;
  }

  const isMatch = await compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(401).send({ message: "비밀번호가 일치하지 않습니다." });
    return;
  }

  if (currentPassword === newPassword) {
    res.status(400).send({ message: "기존의 비밀번호와 동일합니다." });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).send({ message: "비밀번호가 변경되었습니다." });
};
