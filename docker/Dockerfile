# Use the official Node.js 18.14.2 image
FROM node:18.14.2-alpine

# Install shadow package
RUN apk --no-cache add shadow

# Create app directory
WORKDIR /usr/src/app

# Create a new user and switch to that user
RUN useradd -m dicentumuser

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy only necessary files or directories
COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./middlewares ./middlewares
COPY ./models ./models
COPY ./public ./public
COPY ./routes ./routes
COPY ./utils ./utils
COPY ./views ./views
COPY ./app.js ./app.js

# Change ownership to dicentumuser
RUN chown -R dicentumuser:dicentumuser /usr/src/app

# Switch to dicentumuser
USER dicentumuser

# Install dependencies
RUN npm install --ignore-scripts

# Expose port 3000 (or any other port your Express app uses)
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run start" ]
