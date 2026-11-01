from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import students_router, dashboard_router

# Ensure tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management System API",
    description="Professional Student Management System backend REST API for Auspify Technologies",
    version="1.0.0",
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers under /api as well as direct paths
app.include_router(students_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")

# Also mount without /api prefix for direct REST compliance
app.include_router(students_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "system": "Student Management System API",
        "organization": "Auspify Technologies",
        "status": "online",
        "docs_url": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
