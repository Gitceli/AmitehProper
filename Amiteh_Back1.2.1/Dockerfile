FROM python:3.11-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first (for better layer caching)
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Verify Django is installed
RUN pip list | grep Django

# Copy project files
COPY . /app/

# Removed collectstatic (will run it later after migrations)
# RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8000

# Start command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]