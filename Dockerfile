### STAGE 1: BUILD ###
# Use a Node.js image for building the Angular application
FROM node:18.18.0-alpine AS builder

# Set the timezone to Asia/Bangkok (GTM+07:00)
RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

# Set the working directory inside the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Clean npm cache
RUN npm cache clean --force

# Copy the entire project to the working directory
COPY . .

# Install the project dependencies
RUN npm install

# Build the Angular project for the specified environment (default to production)
ARG ENV=production
RUN npm run build -- --configuration=$ENV

### STAGE 2: RUN ###
# Use an Nginx image to serve the Angular application
FROM nginx:1.25.1-alpine

# Set the working directory inside the Docker image
WORKDIR /usr/share/nginx/html

# Remove the default Nginx content
RUN rm -rf ./*

# Copy the built Angular application from the previous stage
COPY --from=builder /app/dist/gw-front .

# Copy the custom Nginx configuration file
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow external access to the application
EXPOSE 80

# Uncomment the following lines if you want to run the container with different environments
# Example: docker build --build-arg ENV=uat -t my-angular-app:uat .
# Example: docker build --build-arg ENV=sit -t my-angular-app:sit .
# Example: docker build --build-arg ENV=production -t my-angular-app:production .
