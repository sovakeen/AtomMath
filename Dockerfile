from python:3.12-slim

env PYTHONDONTWRITEBYTECODE=1
env PYTHONUNBUFFERED=1

workdir /app

copy requirements.txt .

run pip install --no-cache-dir -r requirements.txt

copy . .

expose 8000

cmd ["python", "manage.py", "runserver", "0.0.0.0:8000"]

