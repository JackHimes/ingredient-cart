# pip3 install recipe-scrapers

FROM node:18-alpine

WORKDIR /

ENV \
	NODE_ENV=production \
	PORT=3333

EXPOSE ${PORT}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


CMD [ "node", "build/src/server.js"]