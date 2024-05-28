const request = require('supertest');
const express = require('express');
const { registerKeyStart, registerKeyFinish } = require('../controllers/auth/registerKey');
const { setCurrentRegistrationOptions, getUserPasskeys } = require("../controllers/auth/helpers/dataGetter");
const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');
const Passkey = require("../models/passkey");

jest.mock('../controllers/auth/helpers/dataGetter');
jest.mock("@simplewebauthn/server");
jest.mock("../models/passkey");

const app = express();
app.use(express.json());
app.post('/registerKeyStart', registerKeyStart);
app.post('/registerKeyFinish', registerKeyFinish);

describe('registerKeyStart', () => {
    it('should generate registration options and save them to the user', async () => {
        const mockUser = { username: 'test', options: null, save: jest.fn() };
        const mockReq = { user: mockUser };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        getUserPasskeys.mockResolvedValue([]);
        generateRegistrationOptions.mockResolvedValue({ challenge: 'test' });

        await registerKeyStart(mockReq, mockRes);

        expect(mockUser.options).toEqual({ challenge: 'test' });
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ challenge: 'test' });
    });
});

describe('registerKeyFinish', () => {
    it('should verify the registration response and save the new passkey to the user', async () => {
        const mockNewPasskey = { save: jest.fn() };
        Passkey.mockImplementation(() => mockNewPasskey);

        const mockUser = { options: { user: { id: 'test' }, challenge: 'test' }, passkeys: [], save: jest.fn() };
        const mockReq = { user: mockUser, body: { response: 'test' } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        verifyRegistrationResponse.mockResolvedValue({ verified: true, registrationInfo: { credentialID: 'test', credentialPublicKey: 'test', counter: 'test', credentialDeviceType: 'test', credentialBackedUp: 'test' } });

        await registerKeyFinish(mockReq, mockRes);

        expect(mockUser.passkeys).toContain(mockNewPasskey);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ verified: true });
    });
});