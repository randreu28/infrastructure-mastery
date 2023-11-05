# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the Docker image
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install pnpm
RUN npm install -g pnpm

# Install the application dependencies
RUN pnpm install

# Build the application
RUN pnpm run build

# Expose the port the application runs on
EXPOSE 3000

# Define the command to run the application
CMD [ "node", ".output/server/index.mjs" ]