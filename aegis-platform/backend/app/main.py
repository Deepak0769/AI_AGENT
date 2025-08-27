from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, trading_agent, diet_agent, travel_agent

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000", # In case you use a different frontend port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trading_agent.router)
app.include_router(diet_agent.router)
app.include_router(travel_agent.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Aegis AI Platform"}
