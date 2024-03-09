# Use the official Node.js 18.14.2 image
FROM node:18.14.2-alpine

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
COPY routes ./routes
COPY app.js ./app.js
COPY controllers ./controllers
COPY tests ./tests
COPY bin ./bin
COPY public ./public
COPY views ./views
COPY models ./models
COPY middlewares ./middlewares
COPY utils ./utils

# Expose port 3000 (or any other port your Express app uses)
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run start" ]
