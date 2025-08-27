import os
from fastapi import APIRouter, Depends, HTTPException
from supabase import create_client, Client
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from app.models.schemas import UserCreate
from app.security.jwt_handler import signJWT
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY")
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register_user(user: UserCreate):
    existing_user = supabase.table("users").select("id").eq("email", user.email).execute()
    if existing_user.data:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = supabase.table("users").insert({
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "hashed_password": hashed_password
    }).execute()

    if new_user.data:
        return {"message": "User created successfully"}
    raise HTTPException(status_code=500, detail="Failed to create user")

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = supabase.table("users").select("id", "hashed_password").eq("email", form_data.username).execute()
    if not user.data or not pwd_context.verify(form_data.password, user.data[0]['hashed_password']):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = user.data[0]['id']
    return signJWT(user_id)
