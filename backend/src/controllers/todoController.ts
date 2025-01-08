import { Request, Response, NextFunction } from "express";
import { TodoModel } from "../models/todoModel";
import logger from "../services/logger";

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.getAll(req.query);
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.getById(req.query);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.update(req.body);
    res.json(todo);
  } catch (error) {
    next(error);
  }
}

//--------------------------------------------//

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};


export const toggleTodoStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};


export const addResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};


export const getResources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};


export const deleteResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};


export const updateTodoAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};



// ... Similar pattern for other todo controller methods
// Each method wraps the model call in try/catch and uses next(error) for error handling