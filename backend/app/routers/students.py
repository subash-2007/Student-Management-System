import io
import csv
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.student import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    StudentListResponse,
)
from app.crud import student as crud_student

router = APIRouter(prefix="/students", tags=["Students"])


def find_student_or_404(identifier: str, db: Session):
    """Finds a student by numeric PK ID or student_id string"""
    student = None
    if identifier.isdigit():
        student = crud_student.get_student_by_id(db, int(identifier))
    if not student:
        student = crud_student.get_student_by_student_id(db, identifier)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with identifier '{identifier}' was not found.",
        )
    return student


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(student_in: StudentCreate, db: Session = Depends(get_db)):
    """Create a new student record with duplicate validation"""
    # Check duplicate email
    existing_email = crud_student.get_student_by_email(db, student_in.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Student with email '{student_in.email}' already exists.",
        )

    # Check duplicate student_id if provided
    if student_in.student_id and student_in.student_id.strip():
        existing_id = crud_student.get_student_by_student_id(db, student_in.student_id)
        if existing_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Student with ID '{student_in.student_id}' already exists.",
            )

    return crud_student.create_student(db, student_in)


@router.get("", response_model=StudentListResponse)
def get_students(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search query by name, ID, course, or email"),
    department: Optional[str] = Query(None, description="Filter by department"),
    year: Optional[int] = Query(None, ge=1, le=5, description="Filter by study year"),
    gender: Optional[str] = Query(None, description="Filter by gender (Male, Female, Other)"),
    status: Optional[str] = Query(None, description="Filter by status (Active, Inactive)"),
    db: Session = Depends(get_db),
):
    """List students with search, filters, and pagination"""
    skip = (page - 1) * page_size
    items, total = crud_student.get_students(
        db=db,
        skip=skip,
        limit=page_size,
        search=search,
        department=department,
        year=year,
        gender=gender,
        status=status,
    )
    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
    }


@router.get("/export/csv")
def export_students_csv(
    search: Optional[str] = None,
    department: Optional[str] = None,
    year: Optional[int] = None,
    gender: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Export filtered or all student records to CSV"""
    items, _ = crud_student.get_students(
        db=db,
        skip=0,
        limit=10000,
        search=search,
        department=department,
        year=year,
        gender=gender,
        status=status,
    )

    output = io.StringIO()
    writer = csv.writer(output)
    
    # Headers
    writer.writerow([
        "Student ID",
        "Full Name",
        "Email",
        "Phone",
        "Gender",
        "Date of Birth",
        "Department",
        "Course",
        "Year",
        "Section",
        "Status",
        "Admission Date",
        "Address",
    ])

    for s in items:
        writer.writerow([
            s.student_id,
            s.full_name,
            s.email,
            s.phone,
            s.gender,
            s.dob,
            s.department,
            s.course,
            s.year,
            s.section,
            s.status,
            s.admission_date,
            s.address.replace("\n", " "),
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=students_export.csv"},
    )


@router.get("/{id}", response_model=StudentResponse)
def get_student(id: str, db: Session = Depends(get_db)):
    """Retrieve detailed student information by ID or student_id"""
    return find_student_or_404(id, db)


@router.put("/{id}", response_model=StudentResponse)
def update_student(
    id: str,
    student_in: StudentUpdate,
    db: Session = Depends(get_db),
):
    """Update student record with duplicate validation"""
    student = find_student_or_404(id, db)

    # Check duplicate email if changed
    if student_in.email and student_in.email.strip().lower() != student.email.lower():
        existing_email = crud_student.get_student_by_email(db, student_in.email)
        if existing_email and existing_email.id != student.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Another student already uses email '{student_in.email}'.",
            )

    return crud_student.update_student(db, student, student_in)


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_student(id: str, db: Session = Depends(get_db)):
    """Permanently delete selected student record"""
    student = find_student_or_404(id, db)
    crud_student.delete_student(db, student)
    return {
        "success": True,
        "message": f"Student '{student.full_name}' ({student.student_id}) was successfully deleted.",
    }
