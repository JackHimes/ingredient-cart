FROM node:22-alpine

# Build dependencies for bcrypt
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

# Runtime config (MONGO_DB_URL, KROGER_*, PYSERVICE_URL) is passed in as env vars, see docker-compose.yml
CMD ["npm", "run", "start"]
