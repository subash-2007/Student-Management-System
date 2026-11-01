import React from 'react';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  RotateCcw,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  FileSpreadsheet,
} from 'lucide-react';
import { Student, FilterParams } from '../types/student';
import { DEPARTMENTS, YEARS, GENDERS, STATUSES } from '../utils/constants';

interface StudentsListViewProps {
  students: Student[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  loading: boolean;
  filters: FilterParams;
  onFilterChange: (newFilters: Partial<FilterParams>) => void;
  onResetFilters: () => void;
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onOpenAddModal: () => void;
  onExportCsv: () => void;
}

export const StudentsListView: React.FC<StudentsListViewProps> = ({
  students,
  total,
  page,
  pageSize,
  totalPages,
  loading,
  filters,
  onFilterChange,
  onResetFilters,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal,
  onExportCsv,
}) => {
  const isFiltered =
    Boolean(filters.search) ||
    (filters.department && filters.department !== 'All') ||
    (filters.year && filters.year !== 'All') ||
    (filters.gender && filters.gender !== 'All') ||
    (filters.status && filters.status !== 'All');

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Student Management Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, search, edit, and organize all registered student records in real time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onExportCsv}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95"
            title="Download CSV of current records"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search bar */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={filters.department || 'All'}
              onChange={(e) => onFilterChange({ department: e.target.value, page: 1 })}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-700 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition cursor-pointer"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={filters.year || 'All'}
              onChange={(e) => onFilterChange({ year: e.target.value, page: 1 })}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-700 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition cursor-pointer"
            >
              <option value="All">All Years</option>
              {YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  Year {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={filters.gender || 'All'}
              onChange={(e) => onFilterChange({ gender: e.target.value, page: 1 })}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-700 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition cursor-pointer"
            >
              <option value="All">All Genders</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status || 'All'}
              onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-700 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Badges & Reset */}
        {isFiltered && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters currently applied. Showing {total} match{total !== 1 ? 'es' : ''}.</span>
            </div>
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Student Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-5">Student Information</th>
                <th className="py-3.5 px-5">Student ID</th>
                <th className="py-3.5 px-5">Department & Course</th>
                <th className="py-3.5 px-5">Year / Sec</th>
                <th className="py-3.5 px-5">Contact Details</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="py-4 px-5">
                      <div className="h-6 bg-slate-100 rounded-md w-full" />
                    </td>
                  </tr>
                ))
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition group">
                    {/* Student Info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                          {student.full_name.charAt(0)}
                        </div>
                        <div>
                          <p
                            className="font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition"
                            onClick={() => onViewStudent(student)}
                          >
                            {student.full_name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {student.gender} • Born {student.dob}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="py-4 px-5">
                      <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200/80">
                        {student.student_id}
                      </span>
                    </td>

                    {/* Department & Course */}
                    <td className="py-4 px-5">
                      <p className="font-semibold text-slate-800">{student.department}</p>
                      <p className="text-xs text-slate-500 truncate max-w-xs">{student.course}</p>
                    </td>

                    {/* Year / Sec */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                        Yr {student.year} - Sec {student.section}
                      </span>
                    </td>

                    {/* Contact Details */}
                    <td className="py-4 px-5 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate max-w-[180px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{student.phone}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {student.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="View detailed student profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                          title="Edit student information"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete student record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-700">No Student Records Found</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {isFiltered
                          ? 'No student matched the applied search criteria or filters. Try adjusting your parameters.'
                          : 'The student database is currently empty. Get started by enrolling your first student.'}
                      </p>
                      {isFiltered ? (
                        <button
                          onClick={onResetFilters}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                        >
                          Reset Filters
                        </button>
                      ) : (
                        <button
                          onClick={onOpenAddModal}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
                        >
                          Enroll First Student
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{' '}
            <span className="font-semibold text-slate-700">
              {total > 0 ? (page - 1) * pageSize + 1 : 0}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-700">
              {Math.min(page * pageSize, total)}
            </span>{' '}
            of <span className="font-semibold text-slate-700">{total}</span> total students
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onFilterChange({ page: Math.max(1, page - 1) })}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => onFilterChange({ page: Math.min(totalPages, page + 1) })}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
