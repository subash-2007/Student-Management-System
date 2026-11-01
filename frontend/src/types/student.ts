export interface Student {
  id: number;
  student_id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  department: string;
  course: string;
  year: number;
  section: string;
  address: string;
  admission_date: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  full_name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  department: string;
  course: string;
  year: number;
  section: string;
  address: string;
  admission_date: string;
  status: 'Active' | 'Inactive';
  student_id?: string;
}

export interface StudentListResponse {
  items: Student[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface DepartmentStat {
  department: string;
  count: number;
}

export interface YearStat {
  year: number;
  count: number;
}

export interface DashboardStats {
  total_students: number;
  active_students: number;
  inactive_students: number;
  male_students: number;
  female_students: number;
  other_gender_students: number;
  recently_added_count: number;
  department_stats: DepartmentStat[];
  year_stats: YearStat[];
  recent_students: Student[];
}

export interface FilterParams {
  page?: number;
  page_size?: number;
  search?: string;
  department?: string;
  year?: number | string;
  gender?: string;
  status?: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}
