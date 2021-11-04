/// <reference types = "Cypress" />
import data from "../fixtures/data.json";
import authModule from "../models/authModule";
import errorMessages from "../fixtures/errorMessages.json";

describe("login", () => {
    beforeEach("visit vivify scrum", () => {
        cy.visit("/", { timeout: 30000 });
    });
    it("without credentials", () => {
        authModule.login({email: "", password: ""});
        cy.errorMessageFunction("Email Address", errorMessages.invalidEmail);
        cy.errorMessageFunction("Password", errorMessages.requiredPassword);
        cy.url().should("contain", "/login");
    });
    it("without password", () => {
        authModule.login({password: ""});
        cy.errorMessageFunction("Password", errorMessages.requiredPassword);
        cy.url().should("contain", "/login");
    });
    it("without email", () => {
        authModule.login({email: ""});
        cy.errorMessageFunction("Email Address", errorMessages.invalidEmail);
        cy.url().should("contain", "/login");
    });
    it("with invalid email", () => {
        authModule.login({email: data.invalidUser.email});
        authModule.errorMessage.should("have.length", 3);
        cy.errorMessageWithoutLabel(errorMessages.passOrEmailInvalid)
        cy.url().should("contain", "/login");
    });
    it("with invalid password", () => {
        authModule.login({password: data.invalidUser.password});
        authModule.errorMessage.should("have.length", 3);
        cy.errorMessageWithoutLabel(errorMessages.passOrEmailInvalid)
        cy.url().should("contain", "/login");
    });
    it("login with pom", () => {
        authModule.login({});
        cy.url().should("not.contain", "/login");
    });
    it("logout", () => {
        authModule.login({});
        authModule.logout();
        cy.url().should("contain", "/login");
    });
});
