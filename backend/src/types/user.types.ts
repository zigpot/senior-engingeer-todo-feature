export type UserRole = 'Doctor' | 'Nurse' | 'Secretary';
export type UserSortField = 'name' | 'role' | 'created_at';
export type UserSortOrder = 'asc' | 'desc';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  doctor_number?: string;
  created_at: Date;
}

// export interface User {
//     id: number;
//     name: string;
//     role: 'Doctor' | 'Nurse' | 'Secretary';
//     doctor_number?: string;
//     created_at: Date;
// }

export interface UserQueryParams {
    sort?: UserSortField;
    order?: UserSortOrder;
    role?: 'Doctor' | 'Nurse' | 'Secretary';
    search?: string;
}