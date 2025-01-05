//export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  TODOS: `${API_URL}/todos`,
  USERS: `${API_URL}/users`,
  PATIENTS: `${API_URL}/patients`,
} as const;