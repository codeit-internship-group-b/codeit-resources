import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as categoryController from "../controllers/categoryController";

export const categoryRouter: Router = Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory } = categoryController;

// category CRUD, all for admin
categoryRouter.get("/", asyncHandler(getAllCategories));
categoryRouter.post("/", asyncHandler(createCategory));
categoryRouter.patch("/:categoryId", asyncHandler(updateCategory));
categoryRouter.delete("/:categoryId", asyncHandler(deleteCategory));
