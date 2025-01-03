import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import { Pool } from "pg";

// Define interfaces
interface Todo {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  created_at: Date;
  completed: boolean;
}

interface TodoCreate {
  title: string;
  description?: string;
  deadline?: Date;
}

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Database configuration
const pool = new Pool({
  user: 'todo_user',
  host: 'localhost',
  database: 'todo_db',
  password: 'password123',
  port: 5432,
});

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("TODO Feature Backend is Running");
});

// Add task
app.post("/todos", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, deadline }: TodoCreate = req.body;
    
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const query = `
      INSERT INTO todos (title, description, deadline, created_at, completed)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false)
      RETURNING *
    `;

    const values = [title, description || null, deadline || null];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all tasks
app.get("/todos", async (req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      SELECT * FROM todos 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single task
app.get("/todos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT * FROM todos 
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update task
app.put("/todos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, deadline } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const query = `
      UPDATE todos 
      SET title = $1, description = $2, deadline = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [title, description || null, deadline || null, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Toggle task completion
app.patch("/todos/:id/toggle", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE todos 
      SET completed = NOT completed 
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error toggling task completion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete task
app.delete("/todos/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM todos 
      WHERE id = $1
      RETURNING id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});