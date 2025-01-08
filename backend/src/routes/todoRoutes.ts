import express from "express";
import { validateTodoCreate, validateResourceCreate } from "../middleware/validator";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  // toggleTodoStatus,
  // addResource,
  // getResources,
  // deleteResource,
  // updateTodoAssignment
} from "../controllers/todoController";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", validateTodoCreate, createTodo);
router.put("/:id", validateTodoCreate, updateTodo);
// router.delete("/:id", deleteTodo);
// router.patch("/:id/toggle", toggleTodoStatus);

// // Resource routes
// router.post("/:todoId/resources", validateResourceCreate, addResource);
// router.get("/:todoId/resources", getResources);
// router.delete("/:todoId/resources/:resourceId", deleteResource);

// // Assignment routes
// router.put("/:todoId/assignment", updateTodoAssignment);

export default router;