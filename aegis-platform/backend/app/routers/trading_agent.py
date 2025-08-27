import os
import random
from fastapi import APIRouter, Depends, HTTPException
from app.security.jwt_handler import decodeJWT
from supabase import create_client, Client
from app.models.schemas import Trade
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY")
)

def get_current_user(token: str):
    user = decodeJWT(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user['user_id']

@router.post("/agent/trade/execute")
async def execute_trade(trade: Trade, current_user: str = Depends(get_current_user)):
    # Simulate trade
    price = round(random.uniform(100, 500), 2)
    
    # Save to trade_history table
    trade_data = {
        "user_id": current_user,
        "ticker_symbol": trade.ticker_symbol,
        "action": trade.action,
        "quantity": trade.quantity,
        "price": price,
        "timestamp": datetime.now().isoformat()
    }
    
    data, error = supabase.table("trade_history").insert(trade_data).execute()
    
    if error:
        raise HTTPException(status_code=500, detail="Failed to execute trade")
        
    return {"message": "Trade executed successfully"}

@router.get("/agent/trade/history")
async def get_trade_history(current_user: str = Depends(get_current_user)):
    data, error = supabase.table("trade_history").select("*").eq("user_id", current_user).execute()
    
    if error:
        raise HTTPException(status_code=500, detail="Failed to fetch trade history")
        
    return data.data
