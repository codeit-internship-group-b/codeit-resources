import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createTeam, deleteTeam, getTeams, updateTeam } from "../controllers/teamController";

const teamRouter: Router = Router();

teamRouter.get("/", asyncHandler(getTeams));
teamRouter.post("/", asyncHandler(createTeam));
teamRouter.put("/:teamId", asyncHandler(updateTeam));
teamRouter.delete("/:teamId", asyncHandler(deleteTeam));

export default teamRouter;
