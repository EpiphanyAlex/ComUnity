# Pull base image
FROM python:3.12-slim

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PYTHONPATH=/comunity

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    iputils-ping \
    curl \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /comunity/backend

# Install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose the Flask development server port
EXPOSE 5000

# Run app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"] 