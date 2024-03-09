# Use the official Node.js 18.14.2 image
FROM node:18.14.2

# Create app directory
WORKDIR /usr/src/app

# Create a new user and switch to that user
RUN useradd -m dicentumuser
USER dicentumuser

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy only necessary files or directories
COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./middlewares ./middlewares
COPY ./models ./models
COPY ./public ./public
COPY ./routes ./routes
COPY ./tests ./tests
COPY ./utils ./utils
COPY ./views ./views
COPY ./config ./config
COPY ./app.js ./app.js

# Expose port 3000 (or any other port your Express app uses)
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run start" ]