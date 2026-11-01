import React from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Calendar,
  UserPlus,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenAddModal: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenAddModal,
  onSearchChange,
  searchQuery,
  activeTab,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Administration Dashboard';
      case 'students':
        return 'Student Directory & Records';
      case 'analytics':
        return 'Departmental Analytics';
      case 'about':
        return 'System Architecture & Auspify Project';
      default:
        return 'Student Management';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 no-print transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & View Title */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              {getTitle()}
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-500" />
                Live Database
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Auspify Technologies • Educational Institution Records
            </p>
          </div>
        </div>

        {/* Center / Right: Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or course..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 outline-hidden transition"
            />
          </div>

          {/* Date pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200/70">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentDate}</span>
          </div>

          {/* Quick Notification indicator */}
          <div className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </div>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
};
