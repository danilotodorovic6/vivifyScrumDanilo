/// <reference types = "Cypress" />

import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import organization from "../fixtures/organization.json";

describe("organization", () => {
    let organizationID;
    let token;
    before(() => {
        cy.intercept("api/v2/login").as("userLoggedIn");
        cy.visit("/", { timeout: 30000 });
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.url().should("not.contain", "/login");
        cy.wait("@userLoggedIn").then((intercept) => {
            expect(intercept.request.body.email).to.eq(data.user.email);
            expect(intercept.response.statusCode).to.eq(200);
            token = intercept.response.body.token;
        });
    });
    it("create", () => {
        cy.intercept("POST", "api/v2/organizations").as("createdOrganization");
        cy.get(organization.newOrganization.addNew).click();
        cy.get(organization.newOrganization.organizationNameInput).type(data.organization.name);
        cy.get(organization.newOrganization.nextButton).click();
        cy.get(organization.newOrganization.nextButton).click();
        cy.get(organization.newOrganization.boardCreatedOKButton).click();
        cy.url().should("contain", "/organizations");
        cy.wait("@createdOrganization").then((intercept) => {
            organizationID = intercept.response.body.id;
            expect(intercept.response.body.name).to.eq(data.organization.name);
            expect(intercept.response.statusCode).to.eq(200);
        })
    });
    it("delete", () => {
        cy.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "DELETE", 
            url: `api/v2/organizations/${organizationID}`
            }).as("deleteOrganization");
        cy.wait("@deleteOrganization").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201);
        });
        // cy.get(organization.organizationSidebar.configuration).click();
        // cy.get(organization.organizationInfo.deleteOrganization.deleteClick).click();
        // cy.get(organization.organizationInfo.deleteOrganization.passwordInput).type(data.user.password);
        // cy.get(organization.organizationInfo.deleteOrganization.saveButton).click();
        cy.url().should("not.contain", "/organizations")
    });
});
