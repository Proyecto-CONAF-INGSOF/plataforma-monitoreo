FROM python:slim

# Path: /app
RUN mkdir /app
WORKDIR /app
RUN pip install --upgrade pip

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8080/tcp
EXPOSE 8080/udp

# Install deps from requirements.txt
COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
