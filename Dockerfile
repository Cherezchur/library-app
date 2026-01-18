FROM node:20.10

WORKDIR /app

COPY ./*.json ./
RUN npm install
COPY ./src src/

CMD ['npm', 'run', 'start']