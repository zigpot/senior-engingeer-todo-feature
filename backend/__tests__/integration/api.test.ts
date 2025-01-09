import request from 'supertest';
//import { pool } from '../config/database';
import { pool } from '../../src/config/database';  // Assuming your source code is in src/
import { app } from '../../src/index';
//import { app } from '../index';
import { describe, beforeAll, afterAll, beforeEach, it, expect } from '@jest/globals';

describe('API Integration Tests', () => {
  // Test data
  let testUserId: number;
  let testPatientId: number;
  let testTodoId: number;
  let testResourceId: number;
  let testDoctorId: number;

  beforeAll(async () => {
    // Ensure the database is in a known state
    await pool.query('DELETE FROM resources');
    await pool.query('DELETE FROM todo_assignments');
    await pool.query('DELETE FROM doctor_patient');
    await pool.query('DELETE FROM todos');
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM patients');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('User Endpoints', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Test User',
          role: 'Nurse',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test User');
      testUserId = response.body.id;
    });

    it('should create a new doctor with doctor number', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Test Doctor',
          role: 'Doctor',
          doctor_number: 'DR123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('doctor_number', 'DR123');
      testDoctorId = response.body.id;
    });

    it('should get all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter users by role', async () => {
      const response = await request(app)
        .get('/users')
        .query({ role: 'Doctor' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.every((user: any) => user.role === 'Doctor')).toBeTruthy();
    });

    it('should update a user', async () => {
      const response = await request(app)
        .put(`/users/${testUserId}`)
        .send({
          name: 'Updated User',
          role: 'Secretary'
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated User');
    });
  });

  describe('Patient Endpoints', () => {
    it('should create a new patient', async () => {
      const response = await request(app)
        .post('/patients')
        .send({
          name: 'Test Patient'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Patient');
      testPatientId = response.body.id;
    });

    it('should get all patients', async () => {
      const response = await request(app).get('/patients');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should associate a doctor with a patient', async () => {
      const response = await request(app)
        .post(`/patients/${testPatientId}/doctors`)
        .send({
          doctorId: testDoctorId
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('doctor_number');
    });

    it('should get patient doctors', async () => {
      const response = await request(app)
        .get(`/patients/${testPatientId}/doctors`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Todo Endpoints', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          title: 'Test Todo',
          description: 'Test Description',
          deadline: new Date().toISOString()
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Todo');
      testTodoId = response.body.id;
    });

    it('should get all todos', async () => {
      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should assign a todo to a user', async () => {
      const response = await request(app)
        .put(`/todos/${testTodoId}/assignment`)
        .send({
          user_id: testUserId
        });

      expect(response.status).toBe(200);
      expect(response.body.assignee).toHaveProperty('id', testUserId);
    });

    it('should add a resource to a todo', async () => {
      const response = await request(app)
        .post(`/todos/${testTodoId}/resources`)
        .send({
          url_link: 'https://example.com/resource'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      testResourceId = response.body.id;
    });

    it('should get todo resources', async () => {
      const response = await request(app)
        .get(`/todos/${testTodoId}/resources`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should toggle todo completion', async () => {
      const response = await request(app)
        .patch(`/todos/${testTodoId}/toggle`);

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid user creation', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          role: 'Staff' // Missing required name
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle invalid todo creation', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          description: 'Test Description' // Missing required title
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle non-existent resource deletion', async () => {
      const response = await request(app)
        .delete(`/todos/${testTodoId}/resources/99999`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Cleanup', () => {
    it('should delete a resource', async () => {
      const response = await request(app)
        .delete(`/todos/${testTodoId}/resources/${testResourceId}`);

      expect(response.status).toBe(204);
    });

    it('should delete a todo', async () => {
      const response = await request(app)
        .delete(`/todos/${testTodoId}`);

      expect(response.status).toBe(204);
    });

    it('should remove doctor-patient association', async () => {
      const response = await request(app)
        .delete(`/patients/${testPatientId}/doctors/${testDoctorId}`);

      expect(response.status).toBe(204);
    });

    it('should delete a patient', async () => {
      const response = await request(app)
        .delete(`/patients/${testPatientId}`);

      expect(response.status).toBe(204);
    });

    it('should delete users', async () => {
      await request(app).delete(`/users/${testUserId}`);
      await request(app).delete(`/users/${testDoctorId}`);
      // No need to assert as previous tests verify delete functionality
    });
  });
});
