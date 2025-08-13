from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import signup, contact
from app.database import create_tables
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Peakflow Technologies API",
    description="API pour la landing page Peakflow Technologies",
    version="1.0.0"
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://tranquil-wisdom-production.up.railway.app")  

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Événement déclenché au démarrage de l'application"""
    create_tables()
    print("Base de données initialisée")

app.include_router(signup.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API Peakflow Technologies"}

@app.get("/health")
async def health_check():
    """Endpoint de santé pour Railway"""
    return {"status": "healthy", "message": "API Peakflow Technologies opérationnelle"}
