from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from models import Priority


class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    priority: Priority = Priority.MEDIUM


class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    date: Optional[str] = Field(None, pattern=r"^\d{4}-\d{2}-\d{2}$")
    priority: Optional[Priority] = None
    completed: Optional[bool] = None


class TodoResponse(BaseModel):
    id: str
    title: str
    date: str
    priority: Priority
    completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
