from typing import List

from app import models, schemas
from app.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tweets", tags=["tweets"])


@router.get("", response_model=List[schemas.Tweet])
def get_tweets(session: Session = Depends(get_session)):
    return session.query(models.Tweet).all()


@router.get("/latest", response_model=schemas.Tweet)
def get_latest_tweet(session: Session = Depends(get_session)):
    return session.query(models.Tweet).order_by(models.Tweet.created_at.desc()).first()


@router.get("/{tweet_id}", response_model=schemas.Tweet)
def get_tweet(tweet_id: str, session: Session = Depends(get_session)):
    author = session.query(models.Tweet).filter(models.Tweet.id == tweet_id).one_or_none()
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such tweet exists")
    return author


@router.get("/{tweet_id}/media", response_model=List[schemas.Medium])
def get_tweet_media(tweet_id: str, session: Session = Depends(get_session)):
    tweet = get_tweet(tweet_id, session)
    return session.query(models.Medium).filter(models.Medium.tweet_id == tweet.id).all()


@router.post("", response_model=schemas.Tweet)
def create_tweet(data: schemas.Tweet, session: Session = Depends(get_session)):
    if session.query(models.Tweet).filter(models.Tweet.id == data.id).one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The tweet already exists")
    tweet = models.Tweet(**data.dict())
    session.add(tweet)
    session.commit()
    session.refresh(tweet)
    return tweet


@router.delete("/{tweet_id}", response_model=schemas.Tweet)
def delete_tweet(tweet_id: str, session: Session = Depends(get_session)):
    tweet = get_tweet(tweet_id, session)
    session.delete(tweet)
    session.commit()
    return tweet