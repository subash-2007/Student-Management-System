from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(String(30), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=False)
    gender = Column(String(20), nullable=False)
    dob = Column(String(20), nullable=False)
    department = Column(String(100), nullable=False)
    course = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    section = Column(String(10), nullable=False)
    address = Column(Text, nullable=False)
    admission_date = Column(String(20), nullable=False)
    status = Column(String(20), default="Active", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "gender": self.gender,
            "dob": self.dob,
            "department": self.department,
            "course": self.course,
            "year": self.year,
            "section": self.section,
            "address": self.address,
            "admission_date": self.admission_date,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
