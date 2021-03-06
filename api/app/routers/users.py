from typing import List

from app import models, schemas
from app.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])


def get_user_query(user_id: str, session: Session):
    return session.query(models.User).filter(models.User.id == user_id).one_or_none()


@router.get("", response_model=List[schemas.User])
def get_users(session: Session = Depends(get_session)):
    return session.query(models.User).all()


@router.get("/leaderboard")
def get_leaderboard(session: Session = Depends(get_session)):
    users = get_users(session)
    data = []
    for user in users:
        count = session.query(models.Tweet).filter(models.Tweet.author_id == user.id).count()
        latest = get_user_latest_tweet(user.id, session)
        data.append({"key": f"@{user.username}", "value": count, "author": user, "latest": latest})
    data.sort(key=lambda item: (item["value"], item["latest"].created_at))
    return data


@router.get("/{user_id}", response_model=schemas.User, responses={404: {"model": schemas.ErrorMessage}})
def get_user(user_id: str, session: Session = Depends(get_session)):
    user = get_user_query(user_id, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such user exists")
    return user


@router.get("/{user_id}/latest", response_model=schemas.Tweet)
def get_user_latest_tweet(user_id: str, session: Session = Depends(get_session)):
    return (
        session.query(models.Tweet)
        .filter(models.Tweet.author_id == user_id)
        .order_by(models.Tweet.created_at.desc())
        .first()
    )


@router.get("/{user_id}/tweets", response_model=List[schemas.Tweet], responses={404: {"model": schemas.ErrorMessage}})
def get_user_tweets(user_id: str, session: Session = Depends(get_session)):
    return get_user(user_id, session).tweets


@router.post("", response_model=schemas.User, responses={400: {"model": schemas.ErrorMessage}})
def create_user(data: schemas.User, session: Session = Depends(get_session)):
    if get_user_query(data.id, session):
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
    tweet: models.Tweet
    for tweet in user.tweets:
        medium: models.Medium
        for medium in tweet.media:
            session.delete(medium)
        session.delete(tweet)
    session.delete(user)
    session.commit()
    return user
