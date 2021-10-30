/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import account from "../fixtures/account.json";
import navigationWhenLoggedIn from "../fixtures/navigationWhenLoggedIn.json";
import authModule from "../models/authModule";
import errorMessages from "../fixtures/errorMessages.json";

describe("first cypress block", () => {
    // it("first test", () => {
    //     expect(true).to.eq(true);
    // });

    // it("first test", () => {
    //     expect(true).to.eq(false);
    // });

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
        cy.get(loginPage.oopsError).find("span").should("be.visible").and("contain", errorMessages.passOrEmailInvalid)
        cy.url().should("contain", "/login");
    });
    it("with invalid password", () => {
        authModule.login({password: data.invalidUser.password});
        cy.get(loginPage.oopsError).find("span").should("be.visible").and("contain", errorMessages.passOrEmailInvalid)
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
