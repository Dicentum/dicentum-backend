# Use the official Node.js 18.14.2 image
FROM node:18.14.2

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or any other port your Express app uses)
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run start" ]
