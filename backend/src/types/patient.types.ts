
export type PatientSortField = 'name' | 'created_at';
export type PatientSortOrder = 'asc' | 'desc';

export interface DoctorPatient {
  doctor_id: number;
  patient_id: number;
}

export interface PatientQueryParams {
    sort?: PatientSortField;
    order?: PatientSortOrder;
    search?: string;
}

export interface Patient {
    id: number;
    name: string;
    created_at: Date;
}