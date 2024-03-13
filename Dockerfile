# Use Node.js 18.15 as base image
FROM node:20.11

# Install pnpm globally
RUN npm install -g pnpm@8.15.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if present) to /app
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN pnpm run build

# Expose the port that your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/src/main"]
