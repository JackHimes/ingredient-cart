FROM node:21-alpine3.18

ARG environment=production
ARG mongodb_uri

ENV ENVIRONMENT=$environment
ENV MONGODB_URI=$mongodb_uri

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /src

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]