FROM node:alpine 

WORKDIR /app/frontend

COPY ./package.json ./

RUN npm install
RUN npm install @mui/material @mui/icons-material @emotion/styled @emotion/react

COPY . ./

EXPOSE 3000
