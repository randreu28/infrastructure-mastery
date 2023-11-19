# Uses an official Node runtime as the base image
FROM node:20

# Sets the working directory
WORKDIR /app

# Copies all the application code to the working directory (ommiting everyhing listed on .dockerignore)
COPY . .

# Installs pnpm
RUN npm install pnpm -g

# Installs project dependencies
RUN pnpm install --frozen-lockfile
RUN pnpm run build 

# Makes port 4173 available outside the container
EXPOSE 4173

# Starts the app
CMD ["pnpm", "preview"]
