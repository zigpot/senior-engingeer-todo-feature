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

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'uncompleted';
  created_at: Date;
  deadline: Date | null;
};

interface Resource {
  id: number;
  todo_id: number;
  url_link: string;
}


// User interface lol
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
// Add these types with other type definitions
type PatientSortField = 'name' | 'created_at';
type PatientSortOrder = 'asc' | 'desc';

interface PatientQueryParams {
    sort?: PatientSortField;
    order?: PatientSortOrder;
    search?: string;
}

interface Patient {
    id: number;
    name: string;
    created_at: Date;
}

interface DoctorPatient {
  doctor_id: number;
  patient_id: number;
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

// Add a resource to a todo
app.post("/todos/:todoId/resources", async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId } = req.params;
    const { url_link } = req.body;
    
    if (!url_link) {
      res.status(400).json({ error: "URL link is required" });
      return;
    }

    const query = `
      INSERT INTO resources (todo_id, resource_link)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(query, [todoId, url_link]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all tasks
app.get("/todos", async (req: Request, res: Response) => {
  const {
    sort = "created_at",
    order = "desc",
    status = "all",
    search = "",
  } = req.query;

  // Validate query parameters
  const sortField: SortField = ["title", "deadline", "created_at"].includes(sort as string)
    ? (sort as SortField)
    : "created_at";

  const sortOrder: SortOrder = ["asc", "desc"].includes(order as string)
    ? (order as SortOrder)
    : "desc";

  const filterStatus: FilterStatus = ["all", "completed", "uncompleted"].includes(
    status as string
  )
    ? (status as FilterStatus)
    : "all";

  try {
    // Construct SQL query dynamically
    let query = "SELECT * FROM todos WHERE 1=1";
    const params: (string | number)[] = [];

    // Add status filter
    if (filterStatus !== "all") {
      query += " AND status = $1";
      params.push(filterStatus);
    }

    // Add search filter
    if (search) {
      query += ` AND (title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 2})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Add sorting
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

// Get resources for a specific task
app.get("/todos/:todoId/resources", async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId } = req.params;
    
    const query = `
      SELECT id, todo_id, url_link
      FROM resources
      WHERE todo_id = $1
      ORDER BY id ASC
    `;
    
    const result = await pool.query(query, [todoId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching resources:", error);
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


// Delete a resource
app.delete("/todos/:todoId/resources/:resourceId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { todoId, resourceId } = req.params;

    const query = `
      DELETE FROM resources
      WHERE id = $1 AND todo_id = $2
      RETURNING id
    `;

    const result = await pool.query(query, [resourceId, todoId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Resource not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting resource:", error);
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

// Get All Patients with filtering and sorting
app.get("/patients", async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            sort = 'name',
            order = 'asc',
            search
        } = req.query as PatientQueryParams;

        // Validate sort field
        const validSortFields: PatientSortField[] = ['name', 'created_at'];
        if (!validSortFields.includes(sort as PatientSortField)) {
            res.status(400).json({ error: "Invalid sort field" });
            return;
        }

        // Validate sort order
        const validOrders: PatientSortOrder[] = ['asc', 'desc'];
        if (!validOrders.includes(order as PatientSortOrder)) {
            res.status(400).json({ error: "Invalid sort order" });
            return;
        }

        // Build the WHERE clause for search
        const whereConditions: string[] = [];
        const queryParams: any[] = [];
        let paramCount = 1;

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
            SELECT id, name, created_at 
            FROM patients 
            ${whereClause}
            ORDER BY ${sort} ${order}
        `;

        console.log('Executing query:', query, 'with params:', queryParams); // For debugging

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get single patient by ID
app.get("/patients/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const query = `
            SELECT id, name, created_at 
            FROM patients 
            WHERE id = $1
        `;
        
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Add patient
app.post("/patients", async (req: Request, res: Response): Promise<void> => {
  try {
      const { name }: Patient = req.body;
      
      if (!name) {
          res.status(400).json({ error: "Name is required" });
          return;
      }

      const query = `
          INSERT INTO patients (name, created_at)
          VALUES ($1, CURRENT_TIMESTAMP)
          RETURNING *
      `;

      const values = [name];
      const result = await pool.query(query, values);
      
      console.log('Patient created:', result.rows[0]); // For debugging
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error("Error adding patient:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Update patient
app.put("/patients/:id", async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
          res.status(400).json({ error: "Name is required" });
          return;
      }

      const query = `
          UPDATE patients 
          SET name = $1
          WHERE id = $2
          RETURNING *
      `;

      const values = [name, id];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
          res.status(404).json({ error: "Patient not found" });
          return;
      }

      console.log(`Patient with ID ${id} successfully updated:`, result.rows[0]); // For debugging
      res.json(result.rows[0]);
  } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


// Delete patient
app.delete("/patients/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM patients 
      WHERE id = $1
      RETURNING id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get all doctors associated with a patient
app.get("/patients/:id/doctors", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `
      SELECT u.id, u.name, u.doctor_number
      FROM users u
      INNER JOIN doctor_patient dp ON u.id = dp.doctor_id
      WHERE dp.patient_id = $1 AND u.role = 'Doctor'
      ORDER BY u.name ASC
    `;

    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching patient's doctors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a doctor association to a patient
app.post("/patients/:id/doctors", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: patientId } = req.params;
    const { doctorId } = req.body;

    if (!doctorId) {
      res.status(400).json({ error: "Doctor ID is required" });
      return;
    }

    // First, verify that the doctor exists and has the role 'Doctor'
    const verifyDoctorQuery = `
      SELECT id FROM users 
      WHERE id = $1 AND role = 'Doctor'
    `;

    const doctorResult = await pool.query(verifyDoctorQuery, [doctorId]);
    if (doctorResult.rows.length === 0) {
      res.status(404).json({ error: "Doctor not found or user is not a doctor" });
      return;
    }

    // Then, verify that the patient exists
    const verifyPatientQuery = `
      SELECT id FROM patients 
      WHERE id = $1
    `;

    const patientResult = await pool.query(verifyPatientQuery, [patientId]);
    if (patientResult.rows.length === 0) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    // Check if the association already exists
    const checkExistingQuery = `
      SELECT * FROM doctor_patient 
      WHERE doctor_id = $1 AND patient_id = $2
    `;

    const existingResult = await pool.query(checkExistingQuery, [doctorId, patientId]);
    if (existingResult.rows.length > 0) {
      res.status(409).json({ error: "This doctor is already associated with the patient" });
      return;
    }

    // Create the association
    const insertQuery = `
      INSERT INTO doctor_patient (doctor_id, patient_id)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [doctorId, patientId]);
    
    // Fetch the doctor details to return
    const doctorQuery = `
      SELECT id, name, doctor_number
      FROM users
      WHERE id = $1
    `;
    
    const doctorDetails = await pool.query(doctorQuery, [doctorId]);
    res.status(201).json(doctorDetails.rows[0]);
  } catch (error) {
    console.error("Error adding doctor to patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove a doctor association from a patient
app.delete("/patients/:patientId/doctors/:doctorId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, doctorId } = req.params;

    // Verify that the association exists
    const checkQuery = `
      SELECT * FROM doctor_patient 
      WHERE doctor_id = $1 AND patient_id = $2
    `;

    const checkResult = await pool.query(checkQuery, [doctorId, patientId]);
    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: "Association not found" });
      return;
    }

    // Delete the association
    const deleteQuery = `
      DELETE FROM doctor_patient 
      WHERE doctor_id = $1 AND patient_id = $2
      RETURNING *
    `;

    const result = await pool.query(deleteQuery, [doctorId, patientId]);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing doctor from patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});