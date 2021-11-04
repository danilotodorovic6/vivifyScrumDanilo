/// <reference types = "Cypress" />

import organization from "../models/organizationModule";
import authModule from "../models/authModule";

describe("organization", () => {
    before(() => {
        cy.visit("/", { timeout: 30000 });
        authModule.login({});
        cy.url().should("not.contain", "/login");
    });
    it("create", () => {
        organization.createOrganization();
    });
    it("delete", () => {
        organization.deleteOrganization();
    });
});
