import React from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Calendar,
  Building,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DashboardStats, Student } from '../types/student';

interface DashboardViewProps {
  stats: DashboardStats | null;
  loading: boolean;
  onViewStudent: (student: Student) => void;
  onNavigateToStudents: () => void;
  onOpenAddModal: () => void;
  onExportCsv: () => void;
}

const GENDER_COLORS = ['#3b82f6', '#ec4899', '#8b5cf6'];
const DEPT_COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  loading,
  onViewStudent,
  onNavigateToStudents,
  onOpenAddModal,
  onExportCsv,
}) => {
  if (loading && !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs" />
          <div className="h-80 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs" />
        </div>
      </div>
    );
  }

  const genderData = [
    { name: 'Male', value: stats?.male_students || 0 },
    { name: 'Female', value: stats?.female_students || 0 },
    ...(stats?.other_gender_students ? [{ name: 'Other', value: stats.other_gender_students }] : []),
  ];

  const departmentData = stats?.department_stats || [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/20 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-blue-300" />
            <span>Academic Session 2025-2026 Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Management System
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 mt-2 leading-relaxed">
            Manage academic enrollments, student profiles, department statistics, and institutional records at Auspify Technologies.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs sm:text-sm hover:bg-blue-50 transition shadow-lg shadow-black/10 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
            <button
              onClick={onExportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition backdrop-blur-md border border-white/20 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        {/* Background decorative circles */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* 5 KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-800">{stats?.total_students || 0}</h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">100%</span> in system
            </p>
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-800">{stats?.active_students || 0}</h3>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-semibold">
                {stats?.total_students ? Math.round(((stats.active_students) / stats.total_students) * 100) : 0}%
              </span>{' '}
              currently enrolled
            </p>
          </div>
        </div>

        {/* Male Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Male Students</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">
              M
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-800">{stats?.male_students || 0}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.total_students ? Math.round(((stats.male_students) / stats.total_students) * 100) : 0}% of student body
            </p>
          </div>
        </div>

        {/* Female Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Female Students</span>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm">
              F
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-800">{stats?.female_students || 0}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.total_students ? Math.round(((stats.female_students) / stats.total_students) * 100) : 0}% of student body
            </p>
          </div>
        </div>

        {/* Recently Added Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Registrations</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-800">{stats?.recently_added_count || 0}</h3>
            <p className="text-xs text-slate-500 mt-1">Enrolled in last 30 days</p>
          </div>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Department-wise Student Statistics</h3>
              <p className="text-xs text-slate-500">Distribution of students across engineering & management faculties</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="h-72 w-full">
            {departmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="department"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#ffffff',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]}>
                    {departmentData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No department data available
              </div>
            )}
          </div>
        </div>

        {/* Gender Breakdown Donut Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">Gender Demographics</h3>
              <p className="text-xs text-slate-500">Gender parity across enrolled students</p>
            </div>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            {stats && stats.total_students > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-sm">No gender data</div>
            )}
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-center text-xs">
            <div>
              <span className="text-slate-400 block">Male</span>
              <span className="font-bold text-blue-600 text-sm">{stats?.male_students || 0}</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-slate-400 block">Female</span>
              <span className="font-bold text-pink-600 text-sm">{stats?.female_students || 0}</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-slate-400 block">Ratio (M:F)</span>
              <span className="font-bold text-slate-700 text-sm">
                {stats?.female_students && stats.female_students > 0
                  ? ((stats.male_students || 0) / stats.female_students).toFixed(1) + ':1'
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Student Registrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Recent Student Registrations</h3>
            <p className="text-xs text-slate-500">Newly added student profiles in the institution database</p>
          </div>
          <button
            onClick={onNavigateToStudents}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            <span>View All Students</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-5">Department & Course</th>
                <th className="py-3 px-5">Year / Sec</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Admission Date</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recent_students && stats.recent_students.length > 0 ? (
                stats.recent_students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {student.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer" onClick={() => onViewStudent(student)}>
                            {student.full_name}
                          </p>
                          <p className="text-xs text-slate-400 font-mono">{student.student_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <p className="text-slate-800 font-medium">{student.department}</p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{student.course}</p>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      Year {student.year} • Sec {student.section}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          student.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono text-xs">
                      {student.admission_date}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => onViewStudent(student)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-xs transition"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">
                    No recent student records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
