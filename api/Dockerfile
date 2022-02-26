FROM python:3.9-slim

LABEL description="#TodaysMazai Backend API"
LABEL version="0.1.0"

COPY ./requirements.txt /
RUN python -m pip install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]