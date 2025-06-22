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
    acknowledged: Optional[bool] = False

class FeedbackOut(BaseModel):
    id: int
    employee_id: int
    manager_id: int
    strengths: str
    improvements: str
    sentiment: SentimentEnum
    created_at: datetime
    acknowledged: Optional[bool] = False

    class Config:
        orm_mode = True

class AcknowledgementOut(BaseModel):
    feedback_id: int
    employee_id: int
    class Config:
        orm_mode = True



