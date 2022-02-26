from app import models
from app.database import engine
from app.routers import media, tweets, users
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_origins=origins,
)

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(tweets.router)
app.include_router(media.router)
