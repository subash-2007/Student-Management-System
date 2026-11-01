import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, BookOpen, MapPin, Sparkles, Loader2, Save } from 'lucide-react';
import { Student, StudentFormData } from '../types/student';
import { DEPARTMENTS, COURSES_BY_DEPARTMENT, YEARS, SECTIONS, GENDERS, STATUSES } from '../utils/constants';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
  initialData?: Student | null;
  mode: 'create' | 'edit';
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    full_name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '2004-01-01',
    department: 'Computer Science',
    course: 'B.Tech Computer Science & Engineering',
    year: 1,
    section: 'A',
    address: '',
    admission_date: new Date().toISOString().split('T')[0],
    status: 'Active',
    student_id: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        full_name: initialData.full_name,
        email: initialData.email,
        phone: initialData.phone,
        gender: initialData.gender,
        dob: initialData.dob,
        department: initialData.department,
        course: initialData.course,
        year: initialData.year,
        section: initialData.section,
        address: initialData.address,
        admission_date: initialData.admission_date,
        status: initialData.status,
        student_id: initialData.student_id,
      });
    } else if (mode === 'create') {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        gender: 'Male',
        dob: '2004-01-01',
        department: 'Computer Science',
        course: COURSES_BY_DEPARTMENT['Computer Science'][0],
        year: 1,
        section: 'A',
        address: '',
        admission_date: new Date().toISOString().split('T')[0],
        status: 'Active',
        student_id: '',
      });
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  // Update courses list dynamically if department changes
  const handleDepartmentChange = (dept: string) => {
    const availableCourses = COURSES_BY_DEPARTMENT[dept] || [];
    setFormData((prev) => ({
      ...prev,
      department: dept,
      course: availableCourses[0] || prev.course,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name is required (min 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!phoneClean || phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
      newErrors.phone = 'Valid phone number required (7-15 digits)';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.admission_date) {
      newErrors.admission_date = 'Admission date is required';
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      newErrors.address = 'Residential address is required (min 5 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || 'Failed to save student record.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {mode === 'create' ? 'Enroll New Student' : 'Update Student Record'}
              </h3>
              <p className="text-xs text-blue-100">
                {mode === 'create'
                  ? 'Student ID will be auto-generated sequentially.'
                  : `Editing record for ${initialData?.student_id}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errors.submit}
            </div>
          )}

          {/* Section: Personal Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Personal Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                    errors.full_name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50'
                  } focus:bg-white focus:border-blue-500 outline-hidden transition`}
                />
                {errors.full_name && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.full_name}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                >
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                      errors.dob ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50'
                    } focus:bg-white focus:border-blue-500 outline-hidden transition`}
                  />
                </div>
                {errors.dob && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.dob}</p>
                )}
              </div>

              {/* Student ID (Auto or Manual) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Student ID</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {mode === 'create' ? 'Auto-assigned if empty' : 'Permanent'}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={mode === 'create' ? 'Auto-generated (e.g. STU20250001)' : ''}
                  value={formData.student_id || ''}
                  disabled={mode === 'edit'}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 font-mono disabled:opacity-60 disabled:cursor-not-allowed outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section: Academic Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Academic Placement</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course / Degree <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                >
                  {(COURSES_BY_DEPARTMENT[formData.department] || [formData.course]).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year & Section */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year of Study <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                  >
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        Year {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                  >
                    {SECTIONS.map((sec) => (
                      <option key={sec} value={sec}>
                        Section {sec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status & Admission Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition cursor-pointer"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admission Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.admission_date}
                    onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Contact & Address */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Contact & Address</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="student@auspify.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50'
                  } focus:bg-white focus:border-blue-500 outline-hidden transition`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50'
                  } focus:bg-white focus:border-blue-500 outline-hidden transition`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residential Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Street, City, State, Postal Code"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                    errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50'
                  } focus:bg-white focus:border-blue-500 outline-hidden transition`}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Record...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{mode === 'create' ? 'Enroll Student' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
