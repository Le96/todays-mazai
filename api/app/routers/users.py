from typing import List

from app import models, schemas
from app.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=List[schemas.User])
def get_users(session: Session = Depends(get_session)):
    return session.query(models.User).all()


@router.get("/{user_id}", response_model=schemas.User, responses={404: {"model": schemas.ErrorMessage}})
def get_user(user_id: str, session: Session = Depends(get_session)):
    user = session.query(models.User).filter(models.User.id == user_id).one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such user exists")
    return user


@router.get("/{user_id}/tweets", response_model=List[schemas.Tweet], responses={404: {"model": schemas.ErrorMessage}})
def get_user_tweets(user_id: str, session: Session = Depends(get_session)):
    user = get_user(user_id, session)
    return session.query(models.Tweet).filter(models.Tweet.author_id == user.id).all()


@router.post("", response_model=schemas.User, responses={400: {"model": schemas.ErrorMessage}})
def create_user(data: schemas.User, session: Session = Depends(get_session)):
    if session.query(models.User).filter(models.User.id == data.id).one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The user already exists")
    user = models.User(**data.dict())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.put("", response_model=schemas.User, responses={404: {"model": schemas.ErrorMessage}})
def update_user(data: schemas.UserUpdateRequest, session: Session = Depends(get_session)):
    user = get_user(data.id, session)
    for key, value in data:
        if value is not None:
            setattr(user, key, value)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.delete("/{user_id}", response_model=schemas.User, responses={404: {"model": schemas.ErrorMessage}})
def delete_user(user_id: str, session: Session = Depends(get_session)):
    user = get_user(user_id, session)
    session.delete(user)
    session.commit()
    return user
