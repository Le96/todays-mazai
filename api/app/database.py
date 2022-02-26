import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

USER = os.getenv("DB_USER")
PASS = os.getenv("DB_PASSWORD")
HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
SCHEMA = os.getenv("DB_SCHEMA")

SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASS}@{HOST}:{PORT}/{SCHEMA}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


def get_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()
