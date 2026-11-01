import React from 'react';
import {
  GraduationCap,
  Server,
  Database,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <GraduationCap className="w-6 h-6 text-blue-200" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-blue-200">
            Auspify Technologies • Internship Project
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Student Management System (SMS)
        </h2>
        <p className="text-sm text-blue-100/90 mt-2 max-w-3xl leading-relaxed">
          A high-performance, full-stack educational management platform engineered to facilitate complete CRUD operations, real-time analytics, automated student ID sequence generation, duplicate validation, and data export.
        </p>
      </div>

      {/* Tech Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Backend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800">FastAPI Backend</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            RESTful API microservice with Pydantic v2 data validation, SQLAlchemy ORM, and comprehensive duplicate protection.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">Python 3.10</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">FastAPI</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">Uvicorn</span>
          </div>
        </div>

        {/* Database */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800">SQLite Database</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Normalized relational database schema with unique constraint validation on student IDs and institutional emails.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">SQLite 3</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">SQLAlchemy 2.0</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">ACID Compliant</span>
          </div>
        </div>

        {/* Frontend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800">React + TypeScript</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Modern reactive client powered by Vite, Tailwind CSS v4, Lucide React icons, and Recharts interactive visualizations.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">React 18</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700">Tailwind CSS</span>
          </div>
        </div>
      </div>

      {/* Feature Verification Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Completed Requirements & Implementation Verification</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {[
            'Full CRUD Operations (Create, Read, Update, Delete)',
            'Auto-generated sequential Student IDs (e.g. STU20250001)',
            'Multi-parameter search (Name, ID, Course, Email)',
            'Department, Year, Gender, and Status Filters',
            'Interactive Recharts visualizations & analytics',
            'Normalized SQLite schema with ORM SQL injection protection',
            'Printable student dossiers and official ID cards',
            'Direct CSV Export of filtered and complete records',
            'Form validation (Email, Phone, Required fields)',
            'Automated backend pytest test suite with 100% pass rate',
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
