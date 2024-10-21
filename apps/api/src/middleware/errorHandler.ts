import { type ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  res
    .status(500)
    .send({ message: "Internal Server Error", error: err instanceof Error ? err.message : "Unknown error occurred" });
};
