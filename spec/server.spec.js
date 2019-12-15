var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../server");
    });
    // afterAll(() => {
    //     server.close();
    // });
    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                console.log(data)
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.includes("jpg")).toEqual(true);
        });
      });
    // describe("GET /homepage", () => {
    //     var data = {};
    //     beforeAll((done) => {
    //         Request.get("http://localhost:3000/test", (error, response, body) => {
    //             data.status = response.statusCode;
    //             data.body = JSON.parse(body);
    //             done();
    //         });
    //     });
    //     it("Status 200", () => {
    //         expect(data.status).toBe(500);
    //     });
    //     it("Body", () => {
    //         expect(data.body.message).toBe("This is an error response");
    //     });
    // });
});
