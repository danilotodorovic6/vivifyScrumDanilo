/// <reference types = "Cypress" />

import sidebar from "../fixtures/sidebar.json";
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import organization from "../fixtures/organization.json";

describe("organization", () => {
    it("create", () => {
        cy.visit("/", { timeout: 30000 });
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.get(organization.newOrganization.addNew).click();
        cy.get(organization.newOrganization.organizationNameInput).type(data.organization.name);
        cy.get(organization.newOrganization.nextButton).click();
        cy.get(organization.newOrganization.nextButton).click();
        cy.get(organization.newOrganization.boardCreatedOKButton).click();
    });
});