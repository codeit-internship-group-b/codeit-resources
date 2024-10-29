import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as itemControllers from "../controllers/itemControllers";

export const itemRouter: Router = Router();
const { getAllItems, createItem, updateItem, deleteItem } = itemControllers;

// Item CRUD
itemRouter.get("/:itemType?", asyncHandler(getAllItems));
itemRouter.post("/:itemType", asyncHandler(createItem)); // admin
itemRouter.patch("/:itemId", asyncHandler(updateItem)); // admin
itemRouter.delete("/:itemId", asyncHandler(deleteItem)); // admin

export const seatRouter: Router = Router();

export const equipmentRouter: Router = Router();
