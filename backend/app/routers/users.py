from fastapi import APIRouter, Depends
from app import auth, models
from sqlalchemy.orm import Session
from typing import List
from app.schemas import UserOut

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/team", response_model=List[UserOut])
def get_team_members(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "manager":
        return []
    return db.query(models.User).filter(models.User.manager_id == current_user.id).all()
