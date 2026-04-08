from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from schemas import TodoCreate, TodoUpdate, TodoResponse
import crud

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("", response_model=list[TodoResponse])
def list_todos(date: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_todos(db, date=date)


@router.post("", response_model=TodoResponse, status_code=201)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, payload)


@router.patch("/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: str, payload: TodoUpdate, db: Session = Depends(get_db)):
    todo = crud.update_todo(db, todo_id, payload)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: str, db: Session = Depends(get_db)):
    success = crud.delete_todo(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
