
# Use Node.js LTS
FROM node:20-alpine

# Install git and any build tools needed
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies based on NODE_ENV
ARG NODE_ENV=production
RUN npm install

# Copy source code
COPY . .

# Build Next.js only for production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Expose port
EXPOSE 4000

# Run command depending on environment
CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev -- -H 0.0.0.0; fi

