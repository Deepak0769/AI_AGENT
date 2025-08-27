from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import TravelScheduleRequest, TravelSearchRequest
from app.security.jwt_handler import decodeJWT
from app.services.google_calendar import add_event_to_calendar

router = APIRouter()

def get_current_user(token: str):
    user = decodeJWT(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user['user_id']

@router.post("/agent/travel/search")
async def search_travel(request: TravelSearchRequest, current_user: str = Depends(get_current_user)):
    # Mocked API response
    return [
        {"platform": "Flight", "price": 350.00, "schedule": "2025-10-10 08:00:00"},
        {"platform": "Train", "price": 150.00, "schedule": "2025-10-10 09:30:00"},
    ]

@router.post("/agent/travel/schedule")
async def schedule_travel(request: TravelScheduleRequest, current_user: str = Depends(get_current_user)):
    # This is a placeholder for the actual Google Calendar integration
    # You would fetch the user's Google tokens from the database here
    # and use them to create a calendar event.
    summary = f"Travel: {request.platform}"
    description = f"Price: {request.price}"
    start_time = request.schedule
    
    # In a real app, you'd get these from the database
    # For this MVP, we'll assume they are available
    # Note: You need to implement the OAuth2 flow to get these tokens
    google_creds = None # Replace with actual credentials retrieval
    
    if not google_creds:
        raise HTTPException(status_code=400, detail="Google account not connected")

    event = add_event_to_calendar(google_creds, summary, description, start_time)
    return {"message": "Travel scheduled successfully", "event": event}
