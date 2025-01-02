import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// In-memory storage for todo tasks
const todos: { id: number; task: string; completed: boolean }[] = [];
let currentId = 1;

// Default route
app.get("/", (req, res) => {
    res.send("TODO Feature Backend is Running");
});

// Route to add a new todo task
app.post("/todos", (req: Request, res: Response): void => {
    const { task } = req.body;
    if (!task) {
        res.status(400).json({ error: "Task is required" });
        return;
    }

    const newTodo = {
        id: currentId++,
        task,
        completed: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
    return;
});

// Route to get all todo tasks
app.get("/todos", (req: Request, res: Response): void => {
    res.json(todos);
    return;
});

// Route to edit a todo task
app.put("/todos/:id", (req: Request, res: Response): void => {
    const { id } = req.params;
    const { task } = req.body;

    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        res.status(404).json({ error: "Task not found" });
        return;
    }

    if (!task) {
        res.status(400).json({ error: "Task is required" });
        return;
    }

    todo.task = task;
    res.status(200).json(todo);
    return;
});

// Route to set a task to completed/not completed
app.patch("/todos/:id", (req: Request, res: Response): void => {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        res.status(404).json({ error: "Task not found" });
        return;
    }

    if (typeof completed !== "boolean") {
        res.status(400).json({ error: "Completed status must be a boolean" });
        return;
    }

    todo.completed = completed;
    res.status(200).json(todo);
    return;
});

// Route to delete a todo task
app.delete("/todos/:id", (req: Request, res: Response): void => {
    const { id } = req.params;

    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
        res.status(404).json({ error: "Task not found" });
        return;
    }

    todos.splice(index, 1);
    res.status(204);
    return;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

