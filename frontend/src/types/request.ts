import { UserRole } from "./models";

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface TodoQueryParams extends PaginationParams {
  sort?: 'title' | 'deadline' | 'created_at';
  order?: SortOrder;
  status?: 'all' | 'completed' | 'uncompleted';
}

export interface UserQueryParams extends PaginationParams {
  sort?: 'name' | 'role' | 'created_at';
  order?: SortOrder;
  role?: UserRole;
  search?: string;
}

export interface PatientQueryParams extends PaginationParams {
  sort?: 'name' | 'created_at';
  order?: SortOrder;
  search?: string;
}

