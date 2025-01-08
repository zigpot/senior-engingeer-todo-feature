// errorHandler.ts
import { Request, Response, NextFunction } from "express";
import logger from "../services/logger";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack);
  res.status(500).json({ error: "Internal server error" });
};
