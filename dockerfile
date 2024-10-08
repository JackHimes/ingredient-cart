FROM node:21-alpine3.18

ARG environment=production
ARG mongodb_uri

ENV ENVIRONMENT=$environment
ENV MONGODB_URI=$mongodb_uri

WORKDIR /src

COPY package*.json ./

RUN npm ci

ADD . /src

RUN npm run build

ADD . ./build

EXPOSE 3333

CMD ["npm", "run", "start"]