from typing import List

from app import models, schemas
from app.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/media", tags=["media"])


@router.get("", response_model=List[schemas.Medium])
def get_media(session: Session = Depends(get_session)):
    return session.query(models.Medium).all()


@router.get("/{media_key}", response_model=schemas.Medium, responses={404: {"model": schemas.ErrorMessage}})
def get_medium(media_key: str, session: Session = Depends(get_session)):
    medium = session.query(models.Medium).filter(models.Medium.media_key == media_key).one_or_none()
    if not medium:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such medium exists")
    return medium


@router.post("", response_model=schemas.Medium, responses={400: {"model": schemas.ErrorMessage}})
def create_medium(data: schemas.Medium, session: Session = Depends(get_session)):
    if session.query(models.Medium).filter(models.Medium.media_key == data.media_key).one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The medium already exists")
    medium = models.Medium(**data.dict())
    session.add(medium)
    session.commit()
    session.refresh(medium)
    return medium


@router.delete("/{media_key}", response_model=schemas.Medium, responses={404: {"model": schemas.ErrorMessage}})
def delete_medium(media_key: str, session: Session = Depends(get_session)):
    medium = get_medium(media_key, session)
    session.delete(medium)
    session.commit()
    return medium
