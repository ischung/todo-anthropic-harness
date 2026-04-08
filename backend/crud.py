from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoCreate, TodoUpdate
from datetime import datetime, timezone
import uuid


def get_todos(db: Session, date: str | None = None) -> list[Todo]:
    query = db.query(Todo)
    if date:
        query = query.filter(Todo.date == date)
    return query.order_by(Todo.created_at).all()


def create_todo(db: Session, payload: TodoCreate) -> Todo:
    todo = Todo(
        id=str(uuid.uuid4()),
        title=payload.title,
        date=payload.date,
        priority=payload.priority,
        completed=False,
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def update_todo(db: Session, todo_id: str, payload: TodoUpdate) -> Todo | None:
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        return None
    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(todo, field, value)
    todo.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(todo)
    return todo


def delete_todo(db: Session, todo_id: str) -> bool:
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        return False
    db.delete(todo)
    db.commit()
    return True
