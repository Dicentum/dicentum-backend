# Dicentum Backend

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Dicentum_dicentum-backend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Dicentum_dicentum-backend)

## Installation
### Requirements
- Node.js 18.14.2
### Install
```bash
npm install
```
### Create a .env file
```bash
MONGODB_URI='' #URL for the MongoDB
PORT= #Number of the port
SECRET_KEY='' #For JWT
BCRYPT_SALT= #Number
NODE_ENV='development'
ORIGIN='http://localhost:5173' #For the frontend
TRANSPORTER_EMAIL_USER='' #Email for the transporter
TRANSPORTER_EMAIL_PASS='' #Password for the transporter
TRANSPORTER_EMAIL_HOST='' #Email host for the transporter
TRANSPORTER_EMAIL_PORT=587 #Email port for the transporter
```
### Generate a RSA key in the certificates folder
For that you can use:
  - [JSEncrypt](https://travistidwell.com/jsencrypt/demo/)
  - OpenSSL rsa command (Unix only)

## Usage
### Run development server
```bash
npm run dev
```
### Run production server
```bash
npm run start
```
