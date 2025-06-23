from fastapi import APIRouter, Depends
from app import auth, models
from sqlalchemy.orm import Session
from typing import List
from app.schemas import UserOut
from app import schemas

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/team", response_model=List[UserOut])
def get_team_members(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "manager":
        return []
    return db.query(models.User).filter(models.User.manager_id == current_user.id).all()
@router.get("/me", response_model=schemas.UserOut)
def get_current_user_info(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return current_user