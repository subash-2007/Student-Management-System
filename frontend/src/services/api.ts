import {
  Student,
  StudentFormData,
  StudentListResponse,
  DashboardStats,
  FilterParams,
} from '../types/student';

const API_BASE = '/api';

export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = `Request failed with status ${res.status}`;
    let details: any = null;
    try {
      const data = await res.json();
      details = data;
      if (typeof data.detail === 'string') {
        errorMessage = data.detail;
      } else if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
      }
    } catch {
      // Body is not JSON
    }
    throw new ApiError(errorMessage, res.status, details);
  }
  return res.json();
}

export const studentApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    return handleResponse<DashboardStats>(res);
  },

  async getStudents(params: FilterParams = {}): Promise<StudentListResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.page_size) searchParams.append('page_size', params.page_size.toString());
    if (params.search && params.search.trim()) searchParams.append('search', params.search.trim());
    if (params.department && params.department !== 'All') searchParams.append('department', params.department);
    if (params.year && params.year !== 'All') searchParams.append('year', params.year.toString());
    if (params.gender && params.gender !== 'All') searchParams.append('gender', params.gender);
    if (params.status && params.status !== 'All') searchParams.append('status', params.status);

    const res = await fetch(`${API_BASE}/students?${searchParams.toString()}`);
    return handleResponse<StudentListResponse>(res);
  },

  async getStudent(id: number | string): Promise<Student> {
    const res = await fetch(`${API_BASE}/students/${id}`);
    return handleResponse<Student>(res);
  },

  async createStudent(data: StudentFormData): Promise<Student> {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Student>(res);
  },

  async updateStudent(id: number | string, data: Partial<StudentFormData>): Promise<Student> {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Student>(res);
  },

  async deleteStudent(id: number | string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  getExportCsvUrl(params: FilterParams = {}): string {
    const searchParams = new URLSearchParams();
    if (params.search && params.search.trim()) searchParams.append('search', params.search.trim());
    if (params.department && params.department !== 'All') searchParams.append('department', params.department);
    if (params.year && params.year !== 'All') searchParams.append('year', params.year.toString());
    if (params.gender && params.gender !== 'All') searchParams.append('gender', params.gender);
    if (params.status && params.status !== 'All') searchParams.append('status', params.status);

    return `${API_BASE}/students/export/csv?${searchParams.toString()}`;
  },
};
