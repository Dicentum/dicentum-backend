#!/bin/sh

# Create certificates directory if it doesn't exist
if [ ! -d "certificates" ]; then
  mkdir certificates
fi

# Generate private and public keys if they don't exist
if [ ! -f "certificates/private_key.pem" ]; then
  openssl genrsa -out certificates/private_key.pem 1024
fi
if [ ! -f "certificates/public_key.pem" ]; then
  openssl rsa -in certificates/private_key.pem -pubout -out certificates/public_key.pem
fi

# Start your application
npm start