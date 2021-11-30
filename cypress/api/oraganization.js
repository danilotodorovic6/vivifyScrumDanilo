import faker from "faker";
import color from "../support/consoleColor";

module.exports = {
    get({ token = "" }) {
        return cy
            .request({
                method: "GET",
                url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                return response.body;
            });
    },
    post({ orgName = faker.animal.crocodilia(), token = "", statusCode = 200, testMessage = "" }) {
        return cy
            .request({
                method: "POST",
                url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
                body: {
                    name: orgName,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                typeof response.status !== "undefined" && response.status === statusCode
                    ? color.log(`${testMessage} - Pass`, "success")
                    : color.log(
                            `${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
                            "error"
                      );
                expect(response.status).to.eq(statusCode);
                return response.body;
            });
    },
    delete({ orgId = "", token = "", statusCode = 201, testMessage = "", password = "pass1234" }) {
        return cy
            .request({
                failOnStatusCode: false,
                method: "POST",
                url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
                body: {
                    passwordOrEmail: password,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                typeof response.status !== "undefined" && response.status === statusCode
                    ? color.log(`${testMessage} - Pass`, "success")
                    : color.log(
                            `${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
                            "error"
                      );
                expect(response.status).to.eq(statusCode);
            });
    }
};
