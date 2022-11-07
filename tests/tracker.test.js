const app = require("./server");
const request = require("supertest");

let token = "";

describe("tracker test", () => {
    test("login", async () => {
        const res = await request(app).post("/api/login").send({
            email: "ri@gmail.com",
            password: "12",
        });

        expect(res.statusCode).toBe(200);
        token = res.body.accessToken;
    });

    test("get tracker", async () => {
        console.log(token);
        const res = await request(app)
            .get("/api/tracker")
            .set("Authorization", `Bearer ${token}`);

        console.log(res.statusCode);
        expect(res.statusCode).toBe(200);
    });

    test("add expense", async () => {
        const res = await request(app)
            .post("/api/tracker")
            .set("Authorization", `Bearer ${token}`)
            .send({
                //type bisa income dan outcome
                type: "income",
                expense: 15000,
                description: "uang saku hari senin",
            });

        expect(res.statusCode).toBe(200);
    });
});
