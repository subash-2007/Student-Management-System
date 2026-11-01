from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict
import re


class StudentBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Full Name of the student")
    email: EmailStr = Field(..., description="Unique email address")
    phone: str = Field(..., min_length=7, max_length=20, description="Contact phone number")
    gender: str = Field(..., description="Gender (Male, Female, Other)")
    dob: str = Field(..., description="Date of Birth in YYYY-MM-DD format")
    department: str = Field(..., min_length=2, max_length=100, description="Academic Department")
    course: str = Field(..., min_length=2, max_length=100, description="Course / Degree")
    year: int = Field(..., ge=1, le=5, description="Year of study (1-5)")
    section: str = Field(..., min_length=1, max_length=10, description="Class Section (e.g. A, B, C)")
    address: str = Field(..., min_length=5, max_length=500, description="Residential Address")
    admission_date: str = Field(..., description="Admission date in YYYY-MM-DD format")
    status: str = Field(default="Active", description="Enrollment status: Active or Inactive")

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v: str) -> str:
        valid_genders = ["Male", "Female", "Other"]
        cleaned = v.strip().capitalize()
        if cleaned not in valid_genders:
            raise ValueError(f"Gender must be one of: {', '.join(valid_genders)}")
        return cleaned

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        valid_status = ["Active", "Inactive"]
        cleaned = v.strip().capitalize()
        if cleaned not in valid_status:
            raise ValueError(f"Status must be one of: {', '.join(valid_status)}")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if not cleaned.isdigit() or len(cleaned) < 7 or len(cleaned) > 15:
            raise ValueError("Phone number must contain between 7 and 15 digits")
        return v.strip()

    @field_validator("dob", "admission_date")
    @classmethod
    def validate_date(cls, v: str) -> str:
        # Check standard date format YYYY-MM-DD
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", v):
            raise ValueError("Date must be in YYYY-MM-DD format")
        return v


class StudentCreate(StudentBase):
    student_id: Optional[str] = Field(None, max_length=30, description="Auto-generated if omitted")


class StudentUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=7, max_length=20)
    gender: Optional[str] = None
    dob: Optional[str] = None
    department: Optional[str] = Field(None, min_length=2, max_length=100)
    course: Optional[str] = Field(None, min_length=2, max_length=100)
    year: Optional[int] = Field(None, ge=1, le=5)
    section: Optional[str] = Field(None, min_length=1, max_length=10)
    address: Optional[str] = Field(None, min_length=5, max_length=500)
    admission_date: Optional[str] = None
    status: Optional[str] = None

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            valid_genders = ["Male", "Female", "Other"]
            cleaned = v.strip().capitalize()
            if cleaned not in valid_genders:
                raise ValueError(f"Gender must be one of: {', '.join(valid_genders)}")
            return cleaned
        return v

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            valid_status = ["Active", "Inactive"]
            cleaned = v.strip().capitalize()
            if cleaned not in valid_status:
                raise ValueError(f"Status must be one of: {', '.join(valid_status)}")
            return cleaned
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
            if not cleaned.isdigit() or len(cleaned) < 7 or len(cleaned) > 15:
                raise ValueError("Phone number must contain between 7 and 15 digits")
            return v.strip()
        return v


class StudentResponse(StudentBase):
    id: int
    student_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class StudentListResponse(BaseModel):
    items: List[StudentResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class DepartmentStat(BaseModel):
    department: str
    count: int


class YearStat(BaseModel):
    year: int
    count: int


class DashboardStats(BaseModel):
    total_students: int
    active_students: int
    inactive_students: int
    male_students: int
    female_students: int
    other_gender_students: int
    recently_added_count: int
    department_stats: List[DepartmentStat]
    year_stats: List[YearStat]
    recent_students: List[StudentResponse]
