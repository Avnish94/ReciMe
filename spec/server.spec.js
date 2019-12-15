// use npm test to run test files

var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../server");
    });

    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            // If homepage does not render any jpg images then there is an error
            expect(data.body.includes("jpg")).toEqual(true);
        });
      });
    describe("GET /search", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/search", (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            // If search does not have a dropdown menu then there is an error
            expect(data.body.includes("dropdown-content")).toEqual(true);
        });
    });
    describe("GET /cuisine", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/cuisine", (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            // If data not pulled by spoonacular then there is an error
            expect(data.body.includes("spoonacular")).toEqual(true);
        });
    });
    describe("GET /login", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/login", (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            // Check if long in from rendered in html
            expect(data.body.includes("modal-login")).toEqual(true);
        });
    });
    describe("GET /log_out", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/log_out", (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            // After logging out log in page should no longer be the pages
            // Home page should be rendered instead
            expect(data.body.includes("jpg")).toEqual(true);
        });
    });
    describe("GET /saved_recipes", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/saved_recipes", (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
          // The saved recipie page should be rendered
            expect(data.body.includes("Saved Recipes")).toEqual(true);
        });
    });
});
