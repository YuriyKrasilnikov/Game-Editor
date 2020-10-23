FROM python:slim-buster

# Label docker image
LABEL version="0.1"
LABEL maintaner="Yuriy Krasilnikov"

# Creating Application Source Code Directory
# RUN mkdir -p /var/www

# Installing python dependencies
COPY requirements.txt /usr/src/
RUN pip install --no-cache-dir -r /usr/src/requirements.txt 

# Setting Home Directory for containers
WORKDIR /usr/src/app

# Copying src code to Container
# COPY . /k8s_python_sample_code/src/app

# Application Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONDEVMODE=1

# Exposing Ports
EXPOSE 9000

# Setting Persistent data
# VOLUME /var/www

# Running Python Application
ENTRYPOINT ["python", "-m", "app"]