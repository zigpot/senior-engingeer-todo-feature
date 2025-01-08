import { SortField, SortOrder, FilterStatus } from "./common.types";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  created_at: Date;
  completed: boolean;
}

export interface TodoCreate {
  title: string;
  description?: string;
  deadline?: Date;
}

export interface TodoQueryParams {
  sort?: SortField;
  order?: SortOrder;
  status?: FilterStatus;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'uncompleted';
  created_at: Date;
  deadline: Date | null;
};
