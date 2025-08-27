from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import DietRequest
from app.security.jwt_handler import decodeJWT

router = APIRouter()

def get_current_user(token: str):
    user = decodeJWT(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user['user_id']

@router.post("/agent/diet/recommend")
async def recommend_diet(request: DietRequest, current_user: str = Depends(get_current_user)):
    # Mocked LLM response
    if request.goal == "weight loss":
        return {
            "plan_name": "Beginner Weight Loss",
            "meals": [
                {"meal": "Breakfast", "description": "Oatmeal with berries"},
                {"meal": "Lunch", "description": "Grilled chicken salad"},
                {"meal": "Dinner", "description": "Salmon with roasted vegetables"}
            ]
        }
    elif request.goal == "muscle gain":
        return {
            "plan_name": "Beginner Muscle Gain",
            "meals": [
                {"meal": "Breakfast", "description": "Scrambled eggs with spinach and whole wheat toast"},
                {"meal": "Lunch", "description": "Quinoa bowl with black beans, corn, and avocado"},
                {"meal": "Dinner", "description": "Steak with sweet potato and broccoli"}
            ]
        }
    else:
        return {"message": "Goal not supported yet"}
