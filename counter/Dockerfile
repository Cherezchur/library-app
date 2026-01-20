FROM node:20.10-alpine

WORKDIR /

ARG NODE_ENV=production

COPY ./*.json ./
RUN npm install
COPY ./ src/

CMD ["npm", "run", "start"]