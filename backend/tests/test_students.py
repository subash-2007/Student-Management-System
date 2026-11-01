import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
from app.models.student import Student

# Use an in-memory SQLite database for test isolation
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

from sqlalchemy.pool import StaticPool

test_engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()
    # Add initial test student
    initial_student = Student(
        student_id="STU20250001",
        full_name="John Doe",
        email="john.doe@auspify.edu",
        phone="+91 98765 43210",
        gender="Male",
        dob="2003-05-15",
        department="Computer Science",
        course="B.Tech Computer Science",
        year=2,
        section="A",
        address="123 Tech Street, Silicon Park",
        admission_date="2024-08-01",
        status="Active",
    )
    db.add(initial_student)
    db.commit()
    yield
    Base.metadata.drop_all(bind=test_engine)


def test_student_creation():
    payload = {
        "full_name": "Jane Smith",
        "email": "jane.smith@auspify.edu",
        "phone": "+91 91234 56789",
        "gender": "Female",
        "dob": "2004-03-20",
        "department": "Information Technology",
        "course": "B.Tech IT",
        "year": 1,
        "section": "B",
        "address": "45 Innovation Hub, Cyber City",
        "admission_date": "2025-07-15",
        "status": "Active",
    }
    response = client.post("/api/students", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "Jane Smith"
    assert data["email"] == "jane.smith@auspify.edu"
    assert "student_id" in data
    assert data["student_id"].startswith("STU")


def test_duplicate_email_prevention():
    payload = {
        "full_name": "John Duplicate",
        "email": "john.doe@auspify.edu",  # Same as initial_student
        "phone": "+91 91234 56789",
        "gender": "Male",
        "dob": "2003-01-01",
        "department": "Computer Science",
        "course": "B.Tech Computer Science",
        "year": 2,
        "section": "A",
        "address": "123 Tech Park",
        "admission_date": "2024-08-01",
        "status": "Active",
    }
    response = client.post("/api/students", json=payload)
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


def test_form_validation():
    # Test invalid email format
    payload = {
        "full_name": "Invalid Person",
        "email": "not-an-email",
        "phone": "+91 91234 56789",
        "gender": "Female",
        "dob": "2004-03-20",
        "department": "Information Technology",
        "course": "B.Tech IT",
        "year": 1,
        "section": "B",
        "address": "Short",
        "admission_date": "2025-07-15",
        "status": "Active",
    }
    response = client.post("/api/students", json=payload)
    assert response.status_code == 422


def test_student_retrieval_by_id_and_student_id():
    # Retrieve by student_id string
    response = client.get("/api/students/STU20250001")
    assert response.status_code == 200
    assert response.json()["full_name"] == "John Doe"

    # Retrieve by integer primary key
    numeric_id = response.json()["id"]
    response_num = client.get(f"/api/students/{numeric_id}")
    assert response_num.status_code == 200
    assert response_num.json()["student_id"] == "STU20250001"


def test_student_updating():
    update_payload = {
        "full_name": "John Updated Doe",
        "year": 3,
        "status": "Inactive",
    }
    response = client.put("/api/students/STU20250001", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "John Updated Doe"
    assert data["year"] == 3
    assert data["status"] == "Inactive"


def test_student_deletion():
    response = client.delete("/api/students/STU20250001")
    assert response.status_code == 200
    assert response.json()["success"] is True

    # Ensure it's deleted from database
    verify_response = client.get("/api/students/STU20250001")
    assert verify_response.status_code == 404


def test_search_and_filter_functionality():
    # Add a second student for filtering
    client.post("/api/students", json={
        "full_name": "Sanya Malhotra",
        "email": "sanya.m@auspify.edu",
        "phone": "+91 99887 76655",
        "gender": "Female",
        "dob": "2004-11-12",
        "department": "Mechanical Engineering",
        "course": "B.Tech Mechanical",
        "year": 1,
        "section": "A",
        "address": "400 Ring Road, Jaipur",
        "admission_date": "2025-07-10",
        "status": "Active",
    })

    # Search by name
    res = client.get("/api/students?search=Sanya")
    assert res.status_code == 200
    assert res.json()["total"] == 1
    assert res.json()["items"][0]["full_name"] == "Sanya Malhotra"

    # Filter by department
    res_dept = client.get("/api/students?department=Computer Science")
    assert res_dept.status_code == 200
    assert res_dept.json()["total"] == 1
    assert res_dept.json()["items"][0]["department"] == "Computer Science"

    # Filter by gender
    res_gender = client.get("/api/students?gender=Female")
    assert res_gender.status_code == 200
    assert res_gender.json()["total"] == 1
    assert res_gender.json()["items"][0]["gender"] == "Female"


def test_dashboard_stats():
    response = client.get("/api/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_students" in data
    assert "active_students" in data
    assert "department_stats" in data
    assert data["total_students"] >= 1
