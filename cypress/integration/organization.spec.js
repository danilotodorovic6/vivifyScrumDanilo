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
        cy.url().should("contain", "/organizations")
    });
    it("delete", () => {
        cy.get(organization.organizationSidebar.configuration).click();
        cy.get(organization.organizationInfo.deleteOrganization.deleteClick).click();
        cy.get(organization.organizationInfo.deleteOrganization.passwordInput).type(data.user.password);
        cy.get(organization.organizationInfo.deleteOrganization.saveButton).click();
        cy.url().should("not.contain", "/organizations")
    });
});
