import { pactWith } from "jest-pact";
import { Client } from "node-rest-client";

pactWith(
  {
    consumer: "NodeRestClient",
    provider: "ExamplesForTesting",
  },
  (provider) => {
    describe("An Example API", () => {
      const client = new Client();

      describe("Receives 200 Response", () => {
        const success = {
          body: {
            hello: "world",
          },
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        };

        const request = {
          uponReceiving: "A request",
          withRequest: {
            method: "GET",
            path: "/test",
          },
        };

        beforeEach(() => {
          const interaction = {
            state: "all ok",
            ...request,
            willRespondWith: success,
          };

          return provider.addInteraction(interaction);
        });

        it("test", (done) => {
          client.get(
            `${provider.mockService.baseUrl}/test`,
            {},
            (data, response) => {
              expect(data.hello).toEqual("world");
              expect(response.statusCode).toEqual(200);
              expect(response.headers["content-type"]).toEqual(
                "application/json"
              );
              done();
            }
          );
        });
      });

      describe("Receives 200 Response With Query Parameter", () => {
        const success = {
          body: {
            hello: "world",
          },
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        };

        const request = {
          uponReceiving: "A request with param",
          withRequest: {
            method: "GET",
            path: "/test",
            query: "a=b",
          },
        };

        beforeEach(() => {
          const interaction = {
            state: "expects param",
            ...request,
            willRespondWith: success,
          };

          return provider.addInteraction(interaction);
        });

        it("test - no query parameter", (done) => {
          const args = { parameters: { a: "b" } };
          client.get(
            `${provider.mockService.baseUrl}/test`,
            args,
            (data, response) => {
              expect(data.hello).toEqual("world");
              expect(response.statusCode).toEqual(200);
              expect(response.headers["content-type"]).toEqual(
                "application/json"
              );

              done();
            }
          );
        });
      });

      describe("Receives 200 Response With Header", () => {
        const success = {
          body: {
            hello: "world",
          },
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        };

        const request = {
          uponReceiving: "A request with hedaer",
          withRequest: {
            method: "GET",
            path: "/test",
            header: { a: "b" },
          },
        };

        beforeEach(() => {
          const interaction = {
            state: "expects param",
            ...request,
            willRespondWith: success,
          };

          return provider.addInteraction(interaction);
        });

        it("test - no query parameter", (done) => {
          const args = { headers: { a: "b" } };
          client.get(
            `${provider.mockService.baseUrl}/test`,
            args,
            (data, response) => {
              expect(data.hello).toEqual("world");
              expect(response.statusCode).toEqual(200);
              expect(response.headers["content-type"]).toEqual(
                "application/json"
              );

              done();
            }
          );
        });
      });
    });
  }
);
