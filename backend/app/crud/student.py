from datetime import datetime, timedelta
from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from sqlalchemy import func, or_, desc
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate


def generate_student_id(db: Session) -> str:
    """Generate sequential unique student ID, e.g. STU20250001"""
    year = datetime.utcnow().year
    prefix = f"STU{year}"
    
    # Find latest student ID matching current year
    latest_student = (
        db.query(Student)
        .filter(Student.student_id.like(f"{prefix}%"))
        .order_by(desc(Student.student_id))
        .first()
    )
    
    if latest_student:
        try:
            seq_part = latest_student.student_id[len(prefix):]
            seq_num = int(seq_part) + 1
        except (ValueError, TypeError):
            # Fallback if non-numeric suffix
            total_count = db.query(Student).count() + 1
            seq_num = total_count
    else:
        seq_num = 1
        
    return f"{prefix}{seq_num:04d}"


def get_student_by_id(db: Session, student_pk: int) -> Optional[Student]:
    return db.query(Student).filter(Student.id == student_pk).first()


def get_student_by_student_id(db: Session, student_id: str) -> Optional[Student]:
    return db.query(Student).filter(Student.student_id == student_id.strip()).first()


def get_student_by_email(db: Session, email: str) -> Optional[Student]:
    return db.query(Student).filter(func.lower(Student.email) == email.strip().lower()).first()


def get_students(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    department: Optional[str] = None,
    year: Optional[int] = None,
    gender: Optional[str] = None,
    status: Optional[str] = None,
) -> Tuple[List[Student], int]:
    query = db.query(Student)

    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Student.full_name.ilike(search_term),
                Student.student_id.ilike(search_term),
                Student.email.ilike(search_term),
                Student.course.ilike(search_term),
            )
        )

    if department:
        query = query.filter(Student.department == department.strip())

    if year is not None:
        query = query.filter(Student.year == year)

    if gender:
        query = query.filter(Student.gender == gender.strip().capitalize())

    if status:
        query = query.filter(Student.status == status.strip().capitalize())

    total = query.count()
    items = query.order_by(desc(Student.created_at)).offset(skip).limit(limit).all()

    return items, total


def create_student(db: Session, student_in: StudentCreate) -> Student:
    # Generate student_id if not provided
    student_id = student_in.student_id
    if not student_id or not student_id.strip():
        student_id = generate_student_id(db)
    else:
        student_id = student_id.strip()

    db_student = Student(
        student_id=student_id,
        full_name=student_in.full_name.strip(),
        email=student_in.email.strip().lower(),
        phone=student_in.phone.strip(),
        gender=student_in.gender.strip().capitalize(),
        dob=student_in.dob.strip(),
        department=student_in.department.strip(),
        course=student_in.course.strip(),
        year=student_in.year,
        section=student_in.section.strip().upper(),
        address=student_in.address.strip(),
        admission_date=student_in.admission_date.strip(),
        status=student_in.status.strip().capitalize(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_student(db: Session, student: Student, student_in: StudentUpdate) -> Student:
    update_data = student_in.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if value is not None:
            if field == "email":
                setattr(student, field, value.strip().lower())
            elif field == "section":
                setattr(student, field, value.strip().upper())
            elif isinstance(value, str):
                setattr(student, field, value.strip())
            else:
                setattr(student, field, value)

    student.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(student)
    return student


def delete_student(db: Session, student: Student) -> bool:
    db.delete(student)
    db.commit()
    return True


def get_dashboard_stats(db: Session):
    total_students = db.query(Student).count()
    active_students = db.query(Student).filter(Student.status == "Active").count()
    inactive_students = total_students - active_students

    male_students = db.query(Student).filter(Student.gender == "Male").count()
    female_students = db.query(Student).filter(Student.gender == "Female").count()
    other_gender_students = total_students - (male_students + female_students)

    # Recently added (past 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recently_added_count = (
        db.query(Student)
        .filter(Student.created_at >= thirty_days_ago)
        .count()
    )

    # Department statistics
    dept_query = (
        db.query(Student.department, func.count(Student.id).label("count"))
        .group_by(Student.department)
        .order_by(desc("count"))
        .all()
    )
    department_stats = [{"department": d[0], "count": d[1]} for d in dept_query]

    # Year statistics
    year_query = (
        db.query(Student.year, func.count(Student.id).label("count"))
        .group_by(Student.year)
        .order_by(Student.year)
        .all()
    )
    year_stats = [{"year": y[0], "count": y[1]} for y in year_query]

    # Recent student registrations (latest 5)
    recent_students = (
        db.query(Student)
        .order_by(desc(Student.created_at))
        .limit(5)
        .all()
    )

    return {
        "total_students": total_students,
        "active_students": active_students,
        "inactive_students": inactive_students,
        "male_students": male_students,
        "female_students": female_students,
        "other_gender_students": other_gender_students,
        "recently_added_count": recently_added_count,
        "department_stats": department_stats,
        "year_stats": year_stats,
        "recent_students": recent_students,
    }
