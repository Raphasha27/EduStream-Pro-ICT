from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="EduStream Analytics Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentData(BaseModel):
    attendance: float
    midterm_score: float
    assignments_completed: int

@app.get("/")
def read_root():
    return {"message": "EduStream Analytics Service (Python) is running"}

@app.post("/predict_success")
def predict_success(data: StudentData):
    # Mock prediction logic
    base_prob = (data.attendance * 0.4) + (data.midterm_score * 0.4) + (data.assignments_completed * 2)
    risk_score = min(100, max(0, 100 - base_prob))
    
    status = "At Risk" if risk_score > 50 else "On Track"
    
    return {
        "risk_score": round(risk_score, 2),
        "status": status,
        "recommendation": "Suggest tutoring" if status == "At Risk" else "Continue current path"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
