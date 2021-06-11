import { pactWith } from "jest-pact";
import { Client } from "node-rest-client";

pactWith(
  {
    consumer: "NodeRestClient",
    provider: "ErrorExamplesForTesting",
  },
  (provider) => {
    describe("An Example API", () => {
      const client = new Client();

      describe("Receives 404 Response", () => {
        const success = {
          status: 404,
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
            state: "all 404",
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
              expect(response.statusCode).toEqual(404);
              done();
            }
          );
        });
      });
    });
  }
);
