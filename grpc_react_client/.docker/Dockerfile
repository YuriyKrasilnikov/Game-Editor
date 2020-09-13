FROM node:current-buster-slim

MAINTAINER YuriyKrasilnikov

# Creating Application Source Code Directory
# RUN mkdir -p /var/www

# Setting Home Directory for containers
WORKDIR /usr/frontend/

# Copying src code to Container
COPY package.json .env ./

# Installing react dependencies
RUN npm install -f

# Application Environment variables
ENV CHOKIDAR_USEPOLLING=True

# Exposing Ports
EXPOSE 3000

# Setting Persistent data
# VOLUME /var/www

# Running Node Application
ENTRYPOINT ["npm", "start"]
# ENTRYPOINT ["ls", "public"]

