const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const connectDBTest = require("../middlewares/database/connectionForTests");

let token;
let tokenNotAdmin;

beforeAll(async () => {
    await connectDBTest();

    const res = await request(app)
        .post("/auth/login")
        .send({
            username: "pepmor",
            password: "Perianez1423"
        });

    token = res.body.token;

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

let newTimer;

describe("Timers functionalities", () => {
    it("should create a new timer", async () => {
        const res = await request(app)
            .post("/timers")
            .set('Authorization', `${token}`)
            .send({
                start: "2024-05-29T11:38:00.000+00:00",
                end: "2024-05-30T11:38:00.000+00:00",
                debate: "66507b5bc12efd10ee5724e3",
                user: "6628152856598f5640dc3501",
            });
        expect(res.statusCode).toBe(201);
        newTimer = res.body;
        expect(newTimer.start).toBe("2024-05-29T11:38:00.000Z");
    });

    it("should have the created timer by id", async () => {
        const res = await request(app)
            .get(`/timers/${newTimer._id}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.start).toBe("2024-05-29T11:38:00.000Z");
    });

    it("should not create a new timer with not rights", async () => {
        const res = await request(app)
            .post("/timers")
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                start: "2024-06-01T00:00:00.000Z",
                end: "2024-06-01T23:59:59.999Z",
                debate: "66507b5bc12efd10ee5724e3",
                user: "6628152856598f5640dc3501",
            });

        expect(res.statusCode).toBe(403);
    });

    it("should not delete the created timer with no admin", async () => {
        const res = await request(app)
            .delete(`/timers/${newTimer._id}`)
            .set('Authorization', `${tokenNotAdmin}`);

        expect(res.statusCode).toBe(403);
    });

    it("should delete the created timer", async () => {
        const res = await request(app)
            .delete(`/timers/${newTimer._id}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(204);
    });

    it("should not have the deleted timer", async () => {
        const res = await request(app)
            .get(`/timers/${newTimer._id}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(404);
    });
});