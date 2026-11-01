from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.student import DashboardStats
from app.crud import student as crud_student

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_statistics(db: Session = Depends(get_db)):
    """Fetch aggregated dashboard metrics and charts data"""
    stats = crud_student.get_dashboard_stats(db)
    return stats
