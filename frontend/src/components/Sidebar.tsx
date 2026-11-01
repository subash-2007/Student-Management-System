import React from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Building2,
  Info,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentTab: 'dashboard' | 'students' | 'analytics' | 'about';
  onSelectTab: (tab: 'dashboard' | 'students' | 'analytics' | 'about') => void;
  onOpenAddModal: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalStudents?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
  isOpenMobile,
  onCloseMobile,
  totalStudents = 0,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'students',
      label: 'Student Directory',
      icon: Users,
      badge: totalStudents > 0 ? totalStudents : null,
    },
    {
      id: 'analytics',
      label: 'Department Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'about',
      label: 'About System',
      icon: Info,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } no-print border-r border-slate-800 shadow-2xl`}
      >
        {/* Brand header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight">EduPulse</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">SMS</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Auspify Technologies</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button */}
        <div className="px-5 pt-6 pb-2">
          <button
            onClick={() => {
              onOpenAddModal();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/45 transition-all duration-200 active:scale-[0.98] border border-blue-400/30"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id as any);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                ) : null}
              </button>
            );
          })}

          <div className="pt-6">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Affiliation
            </p>
            <div className="px-3.5 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Auspify Technologies</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Software Development Internship Project • 2025-2026
              </p>
            </div>
          </div>
        </div>

        {/* Footer user / status */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-blue-400">
                AU
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">Admin Portal</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SQLite Connected</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
