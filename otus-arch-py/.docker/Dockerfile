FROM python:3.8.4-slim-buster

WORKDIR /var/www
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 8000

ENTRYPOINT ["python", "app.py"]