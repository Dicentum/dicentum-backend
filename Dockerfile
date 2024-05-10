# Use the official Node.js image
FROM node:21-alpine

RUN apk --no-cache add shadow openssl

WORKDIR /usr/src/app

RUN useradd -m dicentumuser

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
COPY ./uploads ./uploads
COPY ./app.js ./app.js
COPY ./entrypoint.sh ./entrypoint.sh

# Change ownership to dicentumuser
RUN chown -R dicentumuser:dicentumuser /usr/src/app

# Switch to dicentumuser
USER dicentumuser

# Install dependencies
RUN npm install

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

# Expose port 3000 (or any other port your Express app uses)
EXPOSE 3000

# Set the entrypoint script as the command to run
ENTRYPOINT [ "./entrypoint.sh" ]