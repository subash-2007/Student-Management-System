import React from 'react';
import { BarChart3, PieChart as PieIcon, Award, Users, BookOpen, Layers } from 'lucide-react';
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
import { DashboardStats } from '../types/student';

interface AnalyticsViewProps {
  stats: DashboardStats | null;
}

const DEPT_COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];
const YEAR_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ stats }) => {
  const departmentData = stats?.department_stats || [];
  const yearData = (stats?.year_stats || []).map((y) => ({
    name: `Year ${y.year}`,
    students: y.count,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Departmental & Enrollment Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed metrics on student distributions across engineering disciplines, programs, and academic cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Faculty Student Density</h3>
              <p className="text-xs text-slate-500">Total active students per academic department</p>
            </div>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 10, fill: '#64748b' }}
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
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                  {departmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year of Study Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Study Year Cohorts</h3>
              <p className="text-xs text-slate-500">Distribution across 1st to 4th year batches</p>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={yearData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="students"
                >
                  {yearData.map((_, index) => (
                    <Cell key={`year-cell-${index}`} fill={YEAR_COLORS[index % YEAR_COLORS.length]} />
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
                  formatter={(val) => <span className="text-xs text-slate-700 font-semibold">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentData.map((dept, index) => (
          <div
            key={dept.department}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-slate-400">Department #{index + 1}</span>
              <h4 className="text-sm font-bold text-slate-800 mt-0.5">{dept.department}</h4>
              <p className="text-xs text-blue-600 font-medium mt-1">
                {stats?.total_students ? Math.round((dept.count / stats.total_students) * 100) : 0}% of institution
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-lg border border-blue-100">
              {dept.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
