const { getIP, validId } = require('../middlewares/utils');
const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const connectDBTest = require("../middlewares/database/connectionForTests");

beforeAll(async () => {
    await connectDBTest();
});

afterAll(() => {
    mongoose.connection.close();
});

describe('getIP', () => {
    it('returns the correct IP', async () => {
        const req = { headers: { 'x-forwarded-for': '192.0.2.1' } };
        const ip = getIP(req);
        expect(ip).toEqual('192.0.2.1');
    });
});

describe('validId', () => {
    it('calls next when ID is valid', () => {
        mongoose.Types.ObjectId.isValid = jest.fn(() => true);
        const req = httpMocks.createRequest({ params: { id: 'validId' } });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        validId(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('returns 400 when ID is invalid', () => {
        mongoose.Types.ObjectId.isValid = jest.fn(() => false);
        const req = httpMocks.createRequest({ params: { id: 'invalidId' } });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        validId(req, res, next);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: "Invalid ID format" });
        expect(next).not.toHaveBeenCalled();
    });
});