from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class Trade(BaseModel):
    ticker_symbol: str
    action: str
    quantity: int

class DietRequest(BaseModel):
    goal: str
    preferences: List[str]
    allergies: List[str]

class TravelSearchRequest(BaseModel):
    from_city: str
    to_city: str
    date: str
    priority: str

class TravelScheduleRequest(BaseModel):
    platform: str
    price: float
    schedule: str
