FROM python:3.9-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
  gcc \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Use gunicorn for production, PORT env var is set by hosting platforms
CMD sh -c "python manage.py migrate && gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2 --timeout 120" 