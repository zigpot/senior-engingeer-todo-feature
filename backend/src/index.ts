import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import { Pool } from "pg";

// Add these types at the top with other interfaces
type SortField = 'title' | 'deadline' | 'created_at';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'completed' | 'uncompleted';
type UserRole = 'Doctor' | 'Nurse' | 'Secretary';

// Add these interfaces near the top with other interfaces
interface User {
  id: number;
  name: string;
  role: UserRole;
  doctor_number?: string;
  created_at: Date;
}

interface TodoQueryParams {
  sort?: SortField;
  order?: SortOrder;
  status?: FilterStatus;
}

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
    const { 
      sort = 'created_at',
      order = 'desc',
      status = 'all'
    } = req.query as TodoQueryParams;

    // Build the WHERE clause for filtering
    let whereClause = '';
    if (status === 'completed') {
      whereClause = 'WHERE completed = true';
    } else if (status === 'uncompleted') {
      whereClause = 'WHERE completed = false';
    }

    // Validate sort field
    const validSortFields: SortField[] = ['title', 'deadline', 'created_at'];
    if (!validSortFields.includes(sort as SortField)) {
      res.status(400).json({ error: "Invalid sort field" });
      return;
    }

    // Validate sort order
    const validOrders: SortOrder[] = ['asc', 'desc'];
    if (!validOrders.includes(order as SortOrder)) {
      res.status(400).json({ error: "Invalid sort order" });
      return;
    }

    // Handle NULL values in sorting
    let orderByClause = '';
    if (sort === 'deadline') {
      // Put NULL values at the end regardless of sort order
      orderByClause = `
        ORDER BY 
          CASE 
            WHEN deadline IS NULL THEN 1 
            ELSE 0 
          END,
          deadline ${order}
      `;
    } else {
      orderByClause = `ORDER BY ${sort} ${order}`;
    }

    const query = `
      SELECT * FROM todos 
      ${whereClause}
      ${orderByClause}
    `;
    
    console.log('Executing query:', query); // For debugging

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

    // Log the successful update
    console.log(`Task with ID ${id} successfully updated:`, result.rows[0]);

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

// Add these types with other type definitions
type UserSortField = 'name' | 'role' | 'created_at';
type UserSortOrder = 'asc' | 'desc';

interface UserQueryParams {
    sort?: UserSortField;
    order?: UserSortOrder;
    role?: 'Doctor' | 'Nurse' | 'Secretary';
    search?: string;
}


/* USER ENDPOINT */


interface User {
    id: number;
    name: string;
    role: 'Doctor' | 'Nurse' | 'Secretary';
    doctor_number?: string;
    created_at: Date;
}

// Get All User
app.get("/users", async (req: Request, res: Response): Promise<void> => {
  try {
      const {
          sort = 'name',
          order = 'asc',
          role,
          search
      } = req.query as UserQueryParams;

      // Validate sort field
      const validSortFields: UserSortField[] = ['name', 'role', 'created_at'];
      if (!validSortFields.includes(sort as UserSortField)) {
          res.status(400).json({ error: "Invalid sort field" });
          return;
      }

      // Validate sort order
      const validOrders: UserSortOrder[] = ['asc', 'desc'];
      if (!validOrders.includes(order as UserSortOrder)) {
          res.status(400).json({ error: "Invalid sort order" });
          return;
      }

      // Build the WHERE clause for filtering and search
      const whereConditions: string[] = [];
      const queryParams: any[] = [];
      let paramCount = 1;

      // Add role filter if specified
      if (role) {
          const roles = (role as string).split(','); // Split by comma to handle multiple roles
          const rolePlaceholders = roles.map(() => `$${paramCount++}`).join(',');
          whereConditions.push(`role IN (${rolePlaceholders})`);
          queryParams.push(...roles);
      }

      // Add search condition if search term is provided
      if (search) {
          whereConditions.push(`name ILIKE $${paramCount}`);
          queryParams.push(`%${search}%`);
          paramCount++;
      }

      // Combine WHERE conditions
      const whereClause = whereConditions.length > 0
          ? 'WHERE ' + whereConditions.join(' AND ')
          : '';

      const query = `
          SELECT id, name, role, doctor_number, created_at 
          FROM users 
          ${whereClause}
          ORDER BY ${sort} ${order}
      `;

      // const validRoles = ['Doctor', 'Nurse', 'Secretary'];
      // const roles = (role as string).split(',');
      // if (!roles.every(r => validRoles.includes(r))) {
      //     res.status(400).json({ error: "Invalid role(s) specified" });
      //     return;
      // }

      console.log('Executing query:', query, 'with params:', queryParams); // For debugging

      const result = await pool.query(query, queryParams);
      res.json(result.rows);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// Add user
app.post("/users", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, doctor_number }: User = req.body;
    
    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const query = `
      INSERT INTO users (name, role, created_at, doctor_number)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
      RETURNING *
    `;

    const values = [name, role, (role === 'Doctor'? doctor_number : null)];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get single user
app.get("/users/:id", async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      
      const query = `
          SELECT id, name, role, doctor_number, created_at 
          FROM users 
          WHERE id = $1
      `;
      
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
          res.status(404).json({ error: "User not found" });
          return;
      }
      
      res.json(result.rows[0]);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
// Get all users
app.get("/users", async (req: Request, res: Response): Promise<void> => {
  try {
      const query = `
          SELECT id, name, role, doctor_number, created_at 
          FROM users 
          ORDER BY name ASC
      `;
      
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Update user
app.put("/users/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, role, doctor_number } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const query = `
      UPDATE users 
      SET name = $1, role = $2, doctor_number = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [name, role, (role === 'Doctor'? doctor_number : null), id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Log the successful update
    console.log(`User with ID ${id} successfully updated:`, result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user
app.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(`deleting user with id: ${[id]}`);

    const query = `
      DELETE FROM users 
      WHERE id = $1
      RETURNING id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});