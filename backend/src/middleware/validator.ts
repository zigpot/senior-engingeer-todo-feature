import { Request, Response, NextFunction } from "express";

export const validateTodoCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  next();
};

export const validateResourceCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url_link } = req.body;
  if (!url_link) {
    return res.status(400).json({ error: "URL link is required" });
  }
  next();
};
