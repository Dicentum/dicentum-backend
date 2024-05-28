const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const connectDBTest = require("../middlewares/database/connectionForTests");

let tokenNotAdmin;

beforeAll(async () => {
    await connectDBTest();

    const res2 = await request(app)
        .post("/auth/login")
        .send({
            username: "pabper",
            password: "Perianez1423"
        });

    tokenNotAdmin = res2.body.token;
});

afterAll(() => {
    mongoose.connection.close();
});

describe("Parliament functionalities", () => {
    it("should not create a new parliament", async () => {
        const res = await request(app)
            .post("/parliaments")
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                name: "New parliament",
                description: "Test new parliament",
                location: "Madrid",
                totalSeats: 350,
                admin: "663256b6ac157f9880b41d11"
            });

        expect(res.statusCode).toBe(403);
    });
});