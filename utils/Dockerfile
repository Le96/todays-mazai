FROM python:3.9-slim

LABEL description="#TodaysMazai Backend Scraper"
LABEL version="0.1.1"

COPY ./requirements.txt /
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
CMD ["python", "-u", "/app/scraper.py"]
