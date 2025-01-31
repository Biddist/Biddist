import {setupServer} from "../src/setupServer";
import {Server} from "node:net";
import {Express} from "express";
let server: Server;
let app: Express;
beforeAll((done) => {
    setupServer().then(expressServer => {
        app = expressServer;
        server = app.listen(8080,done);
    });
},8000)
afterAll((done) => {
    while(!server) {

    }
    server.close(done);
    server.unref();
},8000)
describe("Server tests", () => {
    test("Standard server health check", async () => {
        let response: Response;
        response = await fetch("http://localhost:8080/status/health");
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json.message).toBe("HEALTHY");
    },8000)
});