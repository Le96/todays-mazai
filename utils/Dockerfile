FROM python:3.9-slim

LABEL description="#TodaysMazai Backend Scraper"
LABEL version="0.1.0"

COPY ./requirements.txt /
RUN python -m pip install -r requirements.txt
CMD ["python", "-u", "/app/scraper.py"]
