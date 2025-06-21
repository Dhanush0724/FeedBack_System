from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import datetime
class RoleEnum(str, Enum):
    manager = "manager"
    employee = "employee"

class SentimentEnum(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum
    manager_id: Optional[int] = None

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: RoleEnum
    class Config:
        orm_mode = True

class FeedbackCreate(BaseModel):
    employee_id: int
    strengths: str
    improvements: str
    sentiment: SentimentEnum

class FeedbackOut(FeedbackCreate):
    id: int
    manager_id: int
    created_at: datetime
    class Config:
        orm_mode = True
class AcknowledgementOut(BaseModel):
    feedback_id: int
    employee_id: int
    class Config:
        orm_mode = True
