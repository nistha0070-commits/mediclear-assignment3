from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="MediClear Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MedicinePlan(BaseModel):
    full_name: str
    email: str
    medicine_name: str
    dosage: str
    timing: str
    notes: str

@app.get("/")
def home():
    return {"message": "MediClear backend is running"}

@app.post("/medicine-plans")
def create_medicine_plan(plan: MedicinePlan):
    try:
        data = plan.model_dump()
        data["status"] = "saved"

        response = supabase.table("medicine_plans").insert(data).execute()

        return {
            "message": "Medicine plan saved successfully",
            "data": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/medicine-plans")
def get_medicine_plans():
    try:
        response = (
            supabase
            .table("medicine_plans")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="MediClear Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MedicinePlan(BaseModel):
    full_name: str
    email: str
    medicine_name: str
    dosage: str
    timing: str
    notes: str

@app.get("/")
def home():
    return {"message": "MediClear backend is running"}

@app.post("/medicine-plans")
def create_medicine_plan(plan: MedicinePlan):
    try:
        data = plan.model_dump()
        data["status"] = "saved"

        response = supabase.table("medicine_plans").insert(data).execute()

        return {
            "message": "Medicine plan saved successfully",
            "data": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/medicine-plans")
def get_medicine_plans():
    try:
        response = (
            supabase
            .table("medicine_plans")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))