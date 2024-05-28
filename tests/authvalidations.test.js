const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const { validate } = require('../controllers/auth/validate');

const createUniqueUsername = require('../controllers/auth/validators/createUniqueUsername');
const generateVerificationCode = require('../controllers/auth/validators/generateVerificationCode');
const passwordValidator = require('../controllers/auth/validators/passwordValidator');
const connectDBTest = require("../middlewares/database/connectionForTests");

beforeAll(async () => {
    await connectDBTest();
});

afterAll(() => {
    mongoose.connection.close();
});

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('createUniqueUsername', () => {
    it('creates a unique username', async () => {
        const username1 = await createUniqueUsername('John', 'Doe');
        const username2 = await createUniqueUsername('John', 'Doe');
        expect(username1).not.toEqual(username2);
    });
});

describe('generateVerificationCode', () => {
    it('generates a verification code of the correct length', () => {
        const code = generateVerificationCode();
        expect(code.toString().length).toBe(6);
    });

    it('generates a unique verification code', () => {
        const code1 = generateVerificationCode();
        const code2 = generateVerificationCode();
        expect(code1).not.toEqual(code2);
    });
});

describe('passwordValidator', () => {
    it('validates a strong password', () => {
        const strongPassword = 'Str0ngP@ssw0rd!';
        expect(passwordValidator(strongPassword)).toBe(true);
    });

    it('invalidates a weak password', () => {
        const weakPassword = 'password';
        expect(passwordValidator(weakPassword)).toBe(false);
    });
});

describe('validate', () => {
    it('should return 404 if user id is undefined', async () => {
        req.params.id = 'undefined';
        await validate(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({message: 'User not defined'});
    });
});
