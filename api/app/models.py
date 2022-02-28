from sqlalchemy import TIMESTAMP, Boolean, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from .database import Base


class Medium(Base):
    __tablename__ = "medium"

    media_key = Column(String(24), primary_key=True)
    tweet_id = Column(String(20), ForeignKey("tweet.id"))
    type = Column(String(12))
    url = Column(String(2083))


class Tweet(Base):
    __tablename__ = "tweet"

    id = Column(String(20), primary_key=True)
    created_at = Column("createdAt", TIMESTAMP)
    author_id = Column("authorId", ForeignKey("user.id"))
    author_username = Column(String(15))
    author_name = Column(String(50))
    text = Column(String(280))

    media = relationship("Medium", backref="tweet")


class User(Base):
    __tablename__ = "user"

    id = Column(String(20), primary_key=True)
    username = Column(String(15))
    name = Column(String(50))
    created_at = Column("createdAt", TIMESTAMP)
    profile_image_url = Column("profileImageUrl", String(2083))
    mentionable = Column(Boolean, default=False)

    tweets = relationship("Tweet", backref="user")
