import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { StudentsListView } from './components/StudentsListView';
import { AnalyticsView } from './components/AnalyticsView';
import { AboutView } from './components/AboutView';
import { StudentFormModal } from './components/StudentFormModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ToastContainer } from './components/Toast';
import { studentApi } from './services/api';
import {
  Student,
  StudentFormData,
  DashboardStats,
  FilterParams,
  ToastMessage,
} from './types/student';

export const App: React.FC = () => {
  // Navigation & Layout
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'students' | 'analytics' | 'about'>('dashboard');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Data States
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [students, setStudents] = useState<Student[]>([]);
  const [studentsTotal, setStudentsTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterParams>({
    page: 1,
    page_size: 10,
    search: '',
    department: 'All',
    year: 'All',
    gender: 'All',
    status: 'All',
  });

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<Student | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState<Student | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Dashboard Stats
  const loadDashboardStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await studentApi.getDashboardStats();
      setDashboardStats(data);
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);
      addToast('error', 'Failed to load stats', err.message);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch Students List
  const loadStudents = useCallback(async () => {
    try {
      setStudentsLoading(true);
      const data = await studentApi.getStudents(filters);
      setStudents(data.items);
      setStudentsTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (err: any) {
      console.error('Error fetching students:', err);
      addToast('error', 'Failed to load students', err.message);
    } finally {
      setStudentsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadDashboardStats();
  }, [loadDashboardStats]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Search Input in Navbar
  const handleGlobalSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
    if (currentTab !== 'students') {
      setCurrentTab('students');
    }
  };

  const handleFilterChange = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      page_size: 10,
      search: '',
      department: 'All',
      year: 'All',
      gender: 'All',
      status: 'All',
    });
  };

  // CRUD Handlers
  const handleOpenAddModal = () => {
    setSelectedStudentForEdit(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setSelectedStudentForEdit(student);
    setFormMode('edit');
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData: StudentFormData) => {
    if (formMode === 'create') {
      const created = await studentApi.createStudent(formData);
      addToast('success', 'Student Enrolled Successfully', `${created.full_name} (${created.student_id}) has been registered.`);
    } else if (formMode === 'edit' && selectedStudentForEdit) {
      const updated = await studentApi.updateStudent(selectedStudentForEdit.id, formData);
      addToast('success', 'Student Updated Successfully', `${updated.full_name} records have been saved.`);
    }
    // Refresh both list and dashboard metrics
    await Promise.all([loadStudents(), loadDashboardStats()]);
  };

  const handleOpenProfileModal = (student: Student) => {
    setSelectedStudentForProfile(student);
    setIsProfileModalOpen(true);
  };

  const handleOpenDeleteModal = (student: Student) => {
    setSelectedStudentForDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudentForDelete) return;
    try {
      setDeleteLoading(true);
      await studentApi.deleteStudent(selectedStudentForDelete.id);
      addToast(
        'success',
        'Student Deleted',
        `${selectedStudentForDelete.full_name} was removed from the database.`
      );
      setIsDeleteModalOpen(false);
      setSelectedStudentForDelete(null);
      await Promise.all([loadStudents(), loadDashboardStats()]);
    } catch (err: any) {
      addToast('error', 'Delete Failed', err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExportCsv = () => {
    const url = studentApi.getExportCsvUrl(filters);
    window.open(url, '_blank');
    addToast('info', 'Export Started', 'Student records are being downloaded as CSV.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAddModal={handleOpenAddModal}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        totalStudents={dashboardStats?.total_students || studentsTotal}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpenMobile((prev) => !prev)}
          onOpenAddModal={handleOpenAddModal}
          onSearchChange={handleGlobalSearch}
          searchQuery={filters.search || ''}
          activeTab={currentTab}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              stats={dashboardStats}
              loading={statsLoading}
              onViewStudent={handleOpenProfileModal}
              onNavigateToStudents={() => setCurrentTab('students')}
              onOpenAddModal={handleOpenAddModal}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'students' && (
            <StudentsListView
              students={students}
              total={studentsTotal}
              page={filters.page || 1}
              pageSize={filters.page_size || 10}
              totalPages={totalPages}
              loading={studentsLoading}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onViewStudent={handleOpenProfileModal}
              onEditStudent={handleOpenEditModal}
              onDeleteStudent={handleOpenDeleteModal}
              onOpenAddModal={handleOpenAddModal}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView stats={dashboardStats} />
          )}

          {currentTab === 'about' && (
            <AboutView />
          )}
        </main>
      </div>

      {/* Modals */}
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStudentForEdit}
        mode={formMode}
      />

      <StudentProfileModal
        student={selectedStudentForProfile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onEdit={handleOpenEditModal}
      />

      <DeleteConfirmModal
        student={selectedStudentForDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default App;
