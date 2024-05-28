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

let newGroup;

describe("Group functionalities", () => {
    it("should create a new group", async () => {
        const res = await request(app)
            .post("/groups")
            .set('Authorization', `${token}`)
            .send({
                name: "New group",
                description: "Test new group",
                color: "#000000",
                seats: 10,
                parliament:"663256b6ac157f9880b41d11"
            });

        expect(res.statusCode).toBe(201);
        newGroup = res.body;
    });

    it("should not create a new group with not rights", async () => {
        const res = await request(app)
            .post("/groups")
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                name: "New group",
                description: "Test new group",
                color: "#000000",
                seats: 10,
                parliament:"663256b6ac157f9880b41d11"
            });

        expect(res.statusCode).toBe(403);
    });

    it("should get the new group in all groups", async () => {
        const res = await request(app)
            .get("/groups")
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(200);

        const group = res.body.find(group => group._id === newGroup._id);
        expect(group).toBeDefined();
    });

    it("should modify the created group", async () => {
        const res = await request(app)
            .put(`/groups/${newGroup._id}`)
            .set('Authorization', `${token}`)
            .send({
                name: "New group edited",
            });

        expect(res.statusCode).toBe(200);
        const modifiedGroup = res.body;
        expect(modifiedGroup.name).toBe("New group edited");
    });

    it("should not modify the created group", async () => {
        const res = await request(app)
            .put(`/groups/${newGroup._id}`)
            .set('Authorization', `${tokenNotAdmin}`)
            .send({
                name: "New group edited",
            });

        expect(res.statusCode).toBe(403);
    });

    it("should not delete the created group with no admin", async () => {
        const res = await request(app)
            .delete(`/groups/${newGroup._id}`)
            .set('Authorization', `${tokenNotAdmin}`);

        expect(res.statusCode).toBe(403);
    });

    it("should delete the created group", async () => {
        const res = await request(app)
            .delete(`/groups/${newGroup._id}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(204);
    });

    it("should not have the deleted group in the list of all groups", async () => {
        const res = await request(app)
            .get("/groups")
            .set('Authorization', `${token}`);

        expect(res.statusCode).toBe(200);

        const group = res.body.find(group => group._id === newGroup._id);
        expect(group).toBeUndefined();
    });
});