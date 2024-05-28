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

let newDebate;

describe("Debate functionalities", () => {
    it("should create a new debate", async () => {
        const res = await request(app)
            .post("/debates")
            .set('Authorization', `${token}`)
            .send({
                title: "Is the earth flat?",
                description: "This is a debate about the shape of the earth",
                date: "2024-12-01",
                isClosed: "false",
                parliament: "663256b6ac157f9880b41d11",
                type: "online",
                votingDescription: "Vote for the shape of the earth",
                startDateVote: "2024-12-02",
                endDateVote: "2024-12-03"
            });

        expect(res.statusCode).toBe(201);
        newDebate = res.body;
        expect(newDebate.title).toBe("Is the earth flat?");
    });

    it("should not authorise to create a new debate", async () => {
        const res = await request(app)
            .post("/debates")
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                title: "Is the earth flat?",
                description: "This is a debate about the shape of the earth",
                date: "2024-12-01",
                isClosed: "false",
                parliament: "663256b6ac157f9880b41d11",
                type: "online",
                votingDescription: "Vote for the shape of the earth",
                startDateVote: "2024-12-02",
                endDateVote: "2024-12-03"
            });
        expect(res.statusCode).toBe(403);
    });

    it("should have the created debate in the list of all debates", async () => {
        const res = await request(app)
            .get("/debates")
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(200);

        const debate = res.body.find(debate => debate._id === newDebate._id);
        expect(debate).toBeDefined();
    });

    it("should modify the created debate", async () => {
        const res = await request(app)
            .put(`/debates/${newDebate._id}`)
            .set('Authorization', `${token}`)
            .send({
                title: "Is the earth flat? Seriously?",
            });

        expect(res.statusCode).toBe(200);
        const modifiedDebate = res.body;
        expect(modifiedDebate.title).toBe("Is the earth flat? Seriously?");
    });

    it("should not modify the created debate", async () => {
        const res = await request(app)
            .put(`/debates/${newDebate._id}`)
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                title: "Is the earth flat? Seriously?",
            });

        expect(res.statusCode).toBe(403);
    });
});

describe("Debate incorrect parameters", () => {
    it("should not insert incorrect vote dates", async () => {
        const res = await request(app)
            .put(`/debates/${newDebate._id}`)
            .set('Authorization', `${token}`)
            .send({
                date: "2022-12-01",
                startDateVote: "2024-12-04T11:11:00.000Z",
                endDateVote: "2024-12-03T12:12:00.000Z"
            });

        expect(res.statusCode).toBe(400);
    });
    it("should not insert incorrect debate dates", async () => {
        const res = await request(app)
            .put(`/debates/${newDebate._id}`)
            .set('Authorization', `${token}`)
            .send({
                date: "2024-12-09",
                startDateVote: "2024-12-07T12:12:00.000Z",
                endDateVote: "2024-12-08T13:13:00.000Z"
            });

        expect(res.statusCode).toBe(400);
    });
});

describe("Debate deletion", () => {
    it("should not delete the created debate", async () => {
        const res = await request(app)
            .delete(`/debates/${newDebate._id}`)
            .set('Authorization', `${tokenNotAdmin}`);

        expect(res.statusCode).toBe(403);
    });

    it("should delete the created debate", async () => {
        const res = await request(app)
            .delete(`/debates/${newDebate._id}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(204);
    });

    it("should not have the deleted debate in the list of all debates", async () => {
        const res = await request(app)
            .get("/debates")
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(200);

        const debate = res.body.find(debate => debate._id === newDebate._id);
        expect(debate).toBeUndefined();
    });
});