from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ErrorMessage(BaseModel):
    detail: str


class ORMModel(BaseModel):
    class Config:
        orm_mode = True


class Medium(ORMModel):
    media_key: str
    tweet_id: str
    type: str
    url: str


class Tweet(ORMModel):
    id: str
    created_at: datetime
    author_id: str
    author_username: str
    author_name: str
    text: str


class User(ORMModel):
    id: str
    username: str
    name: str
    created_at: datetime
    profile_image_url: str
    mentionable: bool = False


class UserUpdateRequest(ORMModel):
    id: str
    username: Optional[str]
    name: Optional[str]
    profile_image_url: str
    mentionable: Optional[bool]
