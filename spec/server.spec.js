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
              console.log(data)
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
});
