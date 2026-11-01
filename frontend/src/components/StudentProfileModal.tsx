import React from 'react';
import {
  X,
  Printer,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
} from 'lucide-react';
import { Student } from '../types/student';

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (student: Student) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Actions bar (hidden in print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-slate-300 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Official Institutional Student Dossier</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              title="Print Dossier or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Profile</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Record</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Area (printable) */}
        <div className="p-8 space-y-6 bg-white text-slate-800 printable-card">
          {/* Institution Header for Print / Official Display */}
          <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  AUSPIFY TECHNOLOGIES
                </h2>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Institute of Advanced Engineering & Technology
                </p>
                <p className="text-[11px] text-blue-600 font-medium">
                  Verified Academic Records Office • Student Management System
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-extrabold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                {student.student_id}
              </span>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                System ID: #{student.id}
              </p>
            </div>
          </div>

          {/* Student Profile Card Hero */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-100">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-lg shadow-blue-500/20 shrink-0">
              {student.full_name.charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h3 className="text-2xl font-black text-slate-900">{student.full_name}</h3>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold ${
                    student.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      student.status === 'Active' ? 'bg-emerald-600' : 'bg-slate-500'
                    }`}
                  />
                  {student.status} Status
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-800">{student.course}</p>
              <p className="text-xs text-slate-600">
                Department of {student.department} • Year {student.year} (Section {student.section})
              </p>
            </div>
          </div>

          {/* Grid Information Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Personal Information */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Personal Information</span>
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gender</span>
                  <span className="font-semibold text-slate-800">{student.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date of Birth</span>
                  <span className="font-semibold text-slate-800">{student.dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nationality</span>
                  <span className="font-semibold text-slate-800">Indian</span>
                </div>
              </div>
            </div>

            {/* 2. Academic Placement */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Academic Details</span>
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-800">{student.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Degree / Program</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[190px]">
                    {student.course}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Year of Study</span>
                  <span className="font-semibold text-slate-800">Year {student.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Section</span>
                  <span className="font-semibold text-slate-800">Section {student.section}</span>
                </div>
              </div>
            </div>

            {/* 3. Contact Information */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Contact Details</span>
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Address</span>
                  </span>
                  <span className="font-semibold text-blue-600 text-xs truncate max-w-[200px]">
                    {student.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Phone Number</span>
                  </span>
                  <span className="font-semibold text-slate-800">{student.phone}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block text-xs mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Residential Address</span>
                  </span>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                    {student.address}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Enrollment & Audit Details */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Enrollment Details</span>
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Date of Admission</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {student.admission_date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrollment Status</span>
                  <span className="font-semibold text-emerald-700">Verified & Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Record Created</span>
                  <span className="font-mono text-xs text-slate-600">
                    {new Date(student.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Database Update</span>
                  <span className="font-mono text-xs text-slate-600">
                    {new Date(student.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Footer / Signature stamp for Print */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">Auspify Technologies Academic Registry</p>
              <p>Generated by EduPulse SMS Automated Engine</p>
            </div>
            <div className="text-right border-t border-slate-400 pt-1 w-48 text-center">
              <p className="font-semibold text-slate-700">Registrar Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
