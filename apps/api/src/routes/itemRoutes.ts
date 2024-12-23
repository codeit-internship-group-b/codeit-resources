import multer from "multer";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as itemControllers from "../controllers/itemControllers";

export const itemRouter: Router = Router();
const { getAllItems, createItem, updateItem, deleteItem } = itemControllers;

const upload = multer();

// Item CRUD
itemRouter.get("/:itemType?", asyncHandler(getAllItems));
itemRouter.post("/:itemType", asyncHandler(createItem)); // admin
itemRouter.patch("/:itemId", upload.none(), asyncHandler(updateItem)); // admin
itemRouter.delete("/:itemId", asyncHandler(deleteItem)); // admin

export const seatRouter: Router = Router();

export const equipmentRouter: Router = Router();
