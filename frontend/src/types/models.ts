export type UserRole = 'Doctor' | 'Nurse' | 'Secretary';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  doctor_number?: string;
  created_at: Date;
}

export interface Patient {
  id: number;
  name: string;
  created_at: Date;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  created_at: Date;
  completed: boolean;
  assignee?: string;
  patient?: string;
}
