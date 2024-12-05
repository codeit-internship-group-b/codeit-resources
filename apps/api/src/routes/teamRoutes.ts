import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createTeam, deleteTeam, getTeams, updateTeamName, updateTeamOrder } from "../controllers/teamController";

const teamRouter: Router = Router();

teamRouter.get("/", asyncHandler(getTeams));
teamRouter.post("/", asyncHandler(createTeam));
teamRouter.put("/:teamId", asyncHandler(updateTeamName));
teamRouter.delete("/:teamId", asyncHandler(deleteTeam));
teamRouter.patch("/order", asyncHandler(updateTeamOrder));

export default teamRouter;
