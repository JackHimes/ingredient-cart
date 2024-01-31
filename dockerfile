FROM node:21-alpine3.18

ARG environment=production
ARG mongo_db_url

ENV ENVIRONMENT=$environment
ENV MONGO_DB_URL=$mongo_db_url

WORKDIR /src

COPY package*.json ./

RUN npm ci

ADD . /src

RUN npm run build

ADD . ./build

EXPOSE 3333

CMD ["npm", "run", "start"]