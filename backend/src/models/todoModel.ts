import { pool } from "../config/database";
import { TodoCreate, TodoQueryParams } from "../types/todo.types";
import { QueryResult } from "pg";

export class TodoModel {
  static async getAll(params: any): Promise<any[]> {
    const {
      sort = "created_at",
      order = "desc",
      status = "all",
      search = "",
    } = params as TodoQueryParams;
    console.log(params);

    let query = "SELECT * FROM todos WHERE 1=1";
    const queryParams: any[] = [];

    if (status !== "all") {
      query += " AND completed = $1";
      queryParams.push(status === "completed");
    }

    if (search) {
      query += ` AND (title ILIKE $${queryParams.length + 1} OR description ILIKE $${
        queryParams.length + 2
      })`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY ${sort} ${order}`;
    console.log(query);
    console.log(queryParams);

    const result = await pool.query(query, queryParams);
    return result.rows;
  }

  static async create(todoData: TodoCreate): Promise<any> {
    const { title, description, deadline } = todoData;
    
    const query = `
      INSERT INTO todos (title, description, deadline, created_at, completed)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false)
      RETURNING *
    `;

    const values = [title, description || null, deadline || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getById(params: any): Promise<any> {
    const { id } = params;
    const query = "SELECT * FROM todos WHERE id = $1";
    const result =  await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(params: any): Promise<any> {
    const { id, title, description, deadline } = params;
    const query = `
      UPDATE todos
      SET title = $1, description = $2, deadline = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [title, description, deadline, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}