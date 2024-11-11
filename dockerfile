# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run Next.js
CMD ["npm", "run", "dev"]
