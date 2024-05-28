const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const connectDBTest = require("../middlewares/database/connectionForTests");

beforeAll(async () => {
    await connectDBTest();
});

afterAll(() => {
    mongoose.connection.close();
});

describe("GET /users", () => {
    it("not user register: expected to fail", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(401);
        expect(res.body.length).toBe(undefined);
    });
});

describe("GET /parliaments", () => {
    it("not user register: expected to fail", async () => {
        const res = await request(app).get("/parliaments");
        expect(res.statusCode).toBe(401);
        expect(res.body.length).toBe(undefined);
    });
});

describe("POST /auth/login", () => {
    it("login in the app with incorrect user", async () => {
        const res = await request(app).post("/auth/login").send({
            username: "pepmo",
            password: "Perianez1423"
        });
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /auth/login", () => {
    it("login in the app with incorrect password", async () => {
        const res = await request(app).post("/auth/login").send({
            username: "pepmor",
            password: "Perianez142"
        });
        expect(res.statusCode).toBe(401);
    });
});

describe("POST /auth/login", () => {
    it("login in the app with correct credentials", async () => {
        const res = await request(app).post("/auth/login").send({
            username: "pepmor",
            password: "Perianez1423"
        });
        expect(res.body.username).toBe("pepmor");
    });
});