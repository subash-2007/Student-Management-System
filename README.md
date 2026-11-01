# 🎓 Student Management System (EduPulse SMS)

> **Full-Stack Academic Administration Platform** — Built as part of a Software Development Internship at **Auspify Technologies**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Screenshots](#screenshots)

---

## Overview

The **Student Management System (EduPulse SMS)** is a professional, full-stack web application that enables educational institutions to manage student records efficiently through complete CRUD operations. All operations interact with a real **SQLite** database — no static/mock data.

### Key Highlights

- **Real Database Operations** — Every Create, Read, Update, Delete action persists to SQLite via SQLAlchemy ORM
- **Auto-generated Student IDs** — Sequential IDs like `STU20250001`, `STU20250002`, etc.
- **Interactive Dashboard** — KPI cards, Recharts visualizations, and recent registrations
- **Advanced Search & Filters** — Search by name/ID/course/email, filter by department/year/gender/status
- **Data Export** — Download filtered student records as CSV
- **Print Support** — Print detailed student profile dossiers
- **100% Test Coverage** — Automated pytest suite with 8 passing tests

---

## Features

### 🏠 Dashboard
- Total Students, Active Students, Male/Female counts
- Recently registered students (last 30 days)
- Department-wise bar chart (Recharts)
- Gender demographics donut chart
- Recent registrations data table

### 👥 Student Management (Full CRUD)
| Operation | Description |
|-----------|-------------|
| **Create** | Enroll new student with auto-generated ID, full validation |
| **Read** | Paginated data table with search/filter, detailed profile modal |
| **Update** | Edit any student field, duplicate email prevention |
| **Delete** | Confirmation dialog, permanent deletion, list refresh |

### 🔍 Search & Filter
- Search by student name, ID, email, or course
- Filter by Department, Year, Gender, Status
- Server-side pagination (10 per page)
- Clear all filters with one click

### 📄 Student Profile
- Personal information (name, gender, DOB)
- Academic details (department, course, year, section)
- Contact information (email, phone, address)
- Enrollment details (admission date, status, timestamps)
- Print-ready official dossier layout

### 📊 Analytics
- Department student density bar chart
- Year cohort distribution pie chart
- Per-department percentage cards

### 🔐 Validation & Security
- Required field validation (frontend + backend)
- Email format validation (Pydantic EmailStr)
- Phone number validation (7-15 digits)
- Duplicate student ID prevention
- Duplicate email prevention
- SQL injection protection via SQLAlchemy ORM
- Proper HTTP error codes and messages

### 📦 Additional Features
- CSV export of all or filtered records
- Print student profiles
- Toast notifications (success/error/info)
- Loading skeleton states
- Empty states with CTAs
- Confirmation dialogs for destructive actions
- Responsive design (mobile, tablet, desktop)

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Build Tool** | Vite |
| **Backend** | Python FastAPI |
| **ORM** | SQLAlchemy 2.0 |
| **Database** | SQLite 3 |
| **Validation** | Pydantic v2 |
| **Server** | Uvicorn |
| **Testing** | Pytest |

---

## Project Structure

```
Student-Management-System/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── database.py          # SQLAlchemy engine & session config
│   │   ├── seed.py              # Database seeder with sample records
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── student.py       # Student SQLAlchemy model
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── student.py       # Pydantic validation schemas
│   │   ├── crud/
│   │   │   ├── __init__.py
│   │   │   └── student.py       # Database CRUD operations
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── students.py      # Student REST API endpoints
│   │       └── dashboard.py     # Dashboard statistics endpoint
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_students.py     # Automated test suite
│   ├── requirements.txt
│   └── students.db              # SQLite database file
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Root application component
│   │   ├── main.tsx             # React entry point
│   │   ├── index.css            # Tailwind CSS imports
│   │   ├── components/
│   │   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   │   ├── Navbar.tsx       # Top navigation bar
│   │   │   ├── DashboardView.tsx
│   │   │   ├── StudentsListView.tsx
│   │   │   ├── AnalyticsView.tsx
│   │   │   ├── AboutView.tsx
│   │   │   ├── StudentFormModal.tsx
│   │   │   ├── StudentProfileModal.tsx
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   └── Toast.tsx
│   │   ├── services/
│   │   │   └── api.ts           # API client service layer
│   │   ├── types/
│   │   │   └── student.ts       # TypeScript interfaces
│   │   └── utils/
│   │       └── constants.ts     # Departments, courses, etc.
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── package.json
└── README.md
```

---

## Installation & Setup

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/subash-2007/Student-Management-System.git
cd Student-Management-System
```

### 2. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Seed the database with sample student records
python -m app.seed

# Start the FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`  
Interactive API docs at `http://127.0.0.1:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be available at `http://127.0.0.1:5173`

> **Note:** The Vite dev server is configured to proxy `/api` requests to the FastAPI backend at port 8000.

---

## API Documentation

### Base URL: `http://127.0.0.1:8000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/students` | Create a new student record |
| `GET` | `/students` | List students (with search, filters, pagination) |
| `GET` | `/students/{id}` | Get student details by ID or student_id |
| `PUT` | `/students/{id}` | Update student information |
| `DELETE` | `/students/{id}` | Delete a student record |
| `GET` | `/students/export/csv` | Export student records as CSV |
| `GET` | `/dashboard/stats` | Get aggregated dashboard statistics |

### Query Parameters for `GET /students`

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | int | Page number (default: 1) |
| `page_size` | int | Items per page (default: 10, max: 100) |
| `search` | string | Search by name, ID, email, or course |
| `department` | string | Filter by department name |
| `year` | int | Filter by year of study (1-5) |
| `gender` | string | Filter by gender (Male, Female, Other) |
| `status` | string | Filter by status (Active, Inactive) |

### Interactive Docs

FastAPI auto-generates interactive API documentation:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

---

## Database Schema

### `students` Table

| Column | Type | Constraints |
|--------|------|------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| `student_id` | VARCHAR(30) | UNIQUE, NOT NULL, INDEXED |
| `full_name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL, INDEXED |
| `phone` | VARCHAR(20) | NOT NULL |
| `gender` | VARCHAR(20) | NOT NULL |
| `dob` | VARCHAR(20) | NOT NULL |
| `department` | VARCHAR(100) | NOT NULL |
| `course` | VARCHAR(100) | NOT NULL |
| `year` | INTEGER | NOT NULL |
| `section` | VARCHAR(10) | NOT NULL |
| `address` | TEXT | NOT NULL |
| `admission_date` | VARCHAR(20) | NOT NULL |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'Active' |
| `created_at` | DATETIME | NOT NULL |
| `updated_at` | DATETIME | NOT NULL |

---

## Testing

### Run the Automated Test Suite

```bash
cd backend
set PYTHONPATH=.
pytest -v tests/test_students.py
```

### Test Coverage

| Test | Description | Status |
|------|-------------|--------|
| `test_student_creation` | Create student with auto-generated ID | ✅ PASSED |
| `test_duplicate_email_prevention` | Reject duplicate email addresses | ✅ PASSED |
| `test_form_validation` | Validate email format, required fields | ✅ PASSED |
| `test_student_retrieval_by_id_and_student_id` | Fetch by PK and student_id | ✅ PASSED |
| `test_student_updating` | Update name, year, status fields | ✅ PASSED |
| `test_student_deletion` | Delete and verify 404 on re-fetch | ✅ PASSED |
| `test_search_and_filter_functionality` | Search by name, filter by dept/gender | ✅ PASSED |
| `test_dashboard_stats` | Verify aggregated statistics endpoint | ✅ PASSED |

```
======================== 8 passed, 0 warnings in 1.93s =========================
```

---

## Sample Student Records

The database is pre-seeded with **16 realistic student records** across 7 departments:

- Computer Science (4 students)
- Information Technology (2 students)
- Electronics & Communication (2 students)
- Mechanical Engineering (2 students)
- Civil Engineering (2 students)
- Business Administration (2 students)
- Data Science (2 students)

---

## Author

**Subash** — Software Development Intern at Auspify Technologies  
Built with ❤️ as part of the 2025-2026 academic internship program.

---

## License

This project is developed for educational and internship purposes at Auspify Technologies.
