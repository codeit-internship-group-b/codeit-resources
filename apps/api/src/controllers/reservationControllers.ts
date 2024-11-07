import { type Request, type Response } from "express";
import { type IReservation } from "@repo/types/src/reservationType";
import { type FilterQuery } from "mongoose";
import { type TReservationStatus } from "@repo/types";
import { Item } from "../models/itemModel";
import { Reservation } from "../models/reservationModel";
import { User } from "../models";
import { isMinuteValid } from "../utils/isMinuteValid";
import { isValidDateFormat } from "../utils/isValidDateFormat";
import { getStartAndEndOfDay } from "../utils/getStartAndEndOfDay";
import { isOverlappedReservation } from "../utils/isOverlappedReservation";
import isObjectIdValid from "../utils/isObjectIdValid";

interface ReservationRequestBody {
  userId: string;
  item: string;
  itemType: "room" | "seat" | "equipment";
  startAt: Date;
  endAt: Date;
  status?: TReservationStatus;
  notes?: string;
  attendees?: string[];
}

const itemTypeToModel: Record<"room" | "seat" | "equipment", string> = {
  room: "Room",
  seat: "Seat",
  equipment: "Equipment",
};

/**
 * @swagger
 * /reservations/dashboard/{userId}:
 *   get:
 *     tags: [Reservations]
 *     summary: 특정 유저의 오늘 날짜 예약 전체 조회
 *     description: Dashboard에 필요한 데이터를 위해 오늘의 전체 예약을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 유저의 id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: 유효하지 않은 사용자 ID입니다.
 */
export const getUserReservations = async (
  req: Request<{ userId: string }, IReservation[]>,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;

  if (!isObjectIdValid(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const today = new Date();
  const { startOfDay, endOfDay } = getStartAndEndOfDay(today);

  const userReservations: IReservation[] = await Reservation.find({
    user: userId,
    startAt: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate("user", "name email")
    .populate("attendees", "name email")
    .populate({
      path: "item",
      select: "name itemType",
    })
    .sort({ itemType: 1, startAt: 1 });

  if (userReservations.length === 0) {
    res.status(200).json({ message: "해당 유저의 예약이 없습니다.", reservations: [] });
    return;
  }

  res.status(200).json(userReservations);
};

/**
 * @swagger
 * /reservations/{itemType}:
 *   get:
 *     tags: [Reservations]
 *     summary: 아이템 타입 및 날짜에 대한 예약 조회
 *     description: 특정 아이템 타입에 대한 예약을 날짜, 상태별로 조회합니다.
 *     parameters:
 *       - in: path
 *         name: itemType
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["room", "seat", "equipment"]
 *         description: 조회할 아이템 타입
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: 조회할 날짜 (YYYY-MM-DD 형식)
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["reserved", "completed", "canceled"]
 *         description: 예약 상태 필터
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: 유효하지 않은 아이템 타입 또는 날짜 형식입니다.
 */
export const getReservationsByTypeAndDate = async (
  req: Request<{ itemType: string }, IReservation[], unknown, { date?: string; status?: string }>,
  res: Response,
): Promise<void> => {
  const { date, status } = req.query;

  const itemType = req.params.itemType as keyof typeof itemTypeToModel;

  if (!(itemType in itemTypeToModel)) {
    res.status(400).json({ message: "유효하지 않은 아이템 타입입니다." });
    return;
  }

  let searchDate = date;
  if (!searchDate) {
    const today = new Date();
    searchDate = today.toISOString().split("T")[0];
  } else if (!isValidDateFormat(searchDate)) {
    res.status(400).json({ message: "날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식으로 입력해주세요." });
    return;
  }

  const targetDate = new Date(`${searchDate}T00:00:00Z`);
  const { startOfDay, endOfDay } = getStartAndEndOfDay(targetDate);

  const query: FilterQuery<IReservation> = {
    itemType,
    $or: [{ startAt: { $gte: startOfDay, $lte: endOfDay } }, { endAt: { $gte: startOfDay, $lte: endOfDay } }],
  };

  if (status) query.status = status;

  const reservations: IReservation[] = await Reservation.find(query)
    .populate("user", "name email")
    .populate("attendees", "name email")
    .populate("item", "name itemType")
    .sort({ status: 1, startAt: 1 });

  res.status(200).json(reservations);
};

/**
 * @swagger
 * /reservations/{itemId}:
 *   post:
 *     tags: [Reservations]
 *     summary: 특정 아이템에 대한 예약 생성
 *     description: 새 예약을 생성합니다.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: 예약할 아이템의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 예약을 생성하는 사용자 ID
 *               itemType:
 *                 type: string
 *                 enum: ["room", "seat", "equipment"]
 *                 description: 아이템 타입
 *               startAt:
 *                 type: string
 *                 format: date-time
 *                 description: 예약 시작 시간
 *               endAt:
 *                 type: string
 *                 format: date-time
 *                 description: 예약 종료 시간
 *               status:
 *                 type: string
 *                 description: 예약 상태
 *                 default : "reserved"
 *               notes:
 *                 type: string
 *                 description: 추가 메모
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 참석자 목록
 *     responses:
 *       201:
 *         description: 예약에 성공했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 savedReservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: 유효하지 않은 데이터입니다.
 *       404:
 *         description: 사용자 또는 아이템을 찾을 수 없습니다.
 *       409:
 *         description: 해당 시간에 이미 예약이 존재합니다.
 */
export const createReservation = async (
  req: Request<{ itemId: string }, IReservation, ReservationRequestBody>,
  res: Response,
): Promise<void> => {
  const { itemId } = req.params;
  const { userId, itemType, startAt, endAt, status, notes, attendees } = req.body;

  if (!isObjectIdValid(userId)) {
    res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    return;
  }

  const userExists = await User.findById(userId).select("_id");
  if (!userExists) {
    res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    return;
  }

  const itemExists = await Item.findById(itemId).select("_id itemType name");
  if (!itemExists) {
    res.status(404).json({ message: "존재하지 않는 아이템입니다." });
    return;
  }

  if (itemType !== "seat") {
    if (!isMinuteValid(startAt) || !isMinuteValid(endAt)) {
      res.status(400).json({ message: "시간은 10분 단위로 설정해야 합니다." });
      return;
    }
  }

  if (startAt >= endAt) {
    res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
    return;
  }

  // 중복 예약 검사
  const overlappingReservation = await isOverlappedReservation(itemId, startAt, endAt);
  if (overlappingReservation) {
    res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
    return;
  }

  const newReservation = new Reservation({
    user: userId,
    item: itemId,
    itemType,
    startAt,
    endAt,
    status: status ?? "reserved",
    notes: notes ?? "",
    attendees: attendees ?? [],
  });

  const savedReservation: IReservation = await newReservation.save();
  res.status(201).json({ message: "예약에 성공했습니다.", savedReservation });
};

/**
 * @swagger
 * /reservations/{reservationId}:
 *   patch:
 *     tags: [Reservations]
 *     summary: 특정 예약 수정
 *     description: 특정 예약을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 예약의 ID
 *     requestBody:
 *       required: true
 *       description: 수정을 원하는 값만 전달하면 됩니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startAt:
 *                 type: string
 *                 format: date-time
 *               endAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [reserved, completed, canceled]
 *               notes:
 *                 type: string
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 예약이 수정되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: 유효하지 않은 요청입니다.
 *       404:
 *         description: 예약을 찾을 수 없습니다.
 *       409:
 *         description: 해당 시간에 이미 예약이 존재합니다.
 */
export const updateReservation = async (
  req: Request<{ reservationId: string }, IReservation, Partial<ReservationRequestBody>>,
  res: Response,
): Promise<void> => {
  const { reservationId } = req.params;
  const { startAt, endAt } = req.body;
  const status = req.body.status;

  const allowedStatuses: TReservationStatus[] = ["reserved", "completed", "canceled"];
  if (status && !allowedStatuses.includes(status)) {
    res.status(400).json({ message: "유효하지 않은 상태 값입니다." });
    return;
  }

  // 예약 존재여부 확인
  const targetReservation: IReservation | null = await Reservation.findById(reservationId).select("startAt endAt item");
  if (!targetReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }

  // startAt이나 endAt 중 하나만 수정된 경우 기존 값을 유지
  const finalStartAt = startAt ? startAt : targetReservation.startAt;
  let finalEndAt = endAt ? endAt : targetReservation.endAt;

  if (status === "completed") {
    // 종료 시간이 현재 시간의 다음 10분으로 설정
    const currentTime = new Date();
    const nextRoundedTime = new Date(Math.ceil(currentTime.getTime() / (10 * 60 * 1000)) * (10 * 60 * 1000));
    finalEndAt = nextRoundedTime;
  } else if (status !== "canceled") {
    // 일반 예약일 경우, 유효성 검사 및 중복 검사
    if (!isMinuteValid(finalStartAt) || !isMinuteValid(finalEndAt)) {
      res.status(400).json({ message: "시간은 10분 단위로 설정해야 합니다." });
      return;
    }
    if (finalStartAt >= finalEndAt) {
      res.status(400).json({ message: "시작 시간은 종료 시간보다 이전이어야 합니다." });
      return;
    }

    // 중복 예약 검사
    const itemId = (targetReservation.item as string).toString();
    const overlappingReservation = await isOverlappedReservation(
      itemId,
      finalStartAt,
      finalEndAt,
      targetReservation._id,
    );
    if (overlappingReservation) {
      res.status(409).json({ message: "해당 시간에 이미 예약이 존재합니다." });
      return;
    }
  }

  const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(
    reservationId,
    {
      startAt: finalStartAt,
      endAt: finalEndAt,
      status: req.body.status,
      notes: req.body.notes,
      attendees: req.body.attendees,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json(updatedReservation);
};

/**
 * @swagger
 * /reservations/{reservationId}:
 *   delete:
 *     tags: [Reservations]
 *     summary: 특정 예약 삭제
 *     description: 특정 예약을 삭제합니다. 관리자 용도로 사용하는게 좋을 것 같습니다.
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 예약의 ID
 *     responses:
 *       200:
 *         description: 예약이 삭제되었습니다.
 *       404:
 *         description: 예약을 찾을 수 없습니다.
 */
export const deleteReservation = async (
  req: Request<{ reservationId: string }, unknown, unknown>,
  res: Response,
): Promise<void> => {
  const { reservationId } = req.params;
  const deletedReservation: IReservation | null = await Reservation.findByIdAndDelete(reservationId);
  if (!deletedReservation) {
    res.status(404).json({ message: "예약을 찾을 수 없습니다." });
    return;
  }
  res.status(200).json({ message: "예약이 삭제되었습니다." });
};
