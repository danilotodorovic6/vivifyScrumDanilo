import userApi from "../api/user";
import organizationApi from "../api/oraganization";

describe("Api testing", () => {
    let userToken;
    before(() => {
        userApi.login({ testMessage: "01-Login before other tests" }).then((token) => {
            userToken = token;
            //za koriscenje tokena iz drugog spec-a
            cy.writeFile("cypress/fixtures/token.json", { tokenAT: token });
        });
    });
    let organizationId;
    it("02 - create organization", () => {
        organizationApi
            .post({
                token: userToken,
                testMessage: "02 - create organization"
            })
            .then((organizationObject) => {
                organizationId = organizationObject.id;
            });
    });

    it("03 - Delete organization", () => {
        organizationApi.delete({
            token: userToken,
            orgId: organizationId,
            testMessage: "03 - Delete organization"
        });
    });

    let allOrganizations;
    it("04 - Get all organizations", () => {
        organizationApi
            .get({
                token: userToken,
                testMessage: "04 - Get all organizations"
            })
            .then((allOrgs) => {
                allOrganizations = allOrgs;
            });
    });

    
});
