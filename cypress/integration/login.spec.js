/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import account from "../fixtures/account.json";
import navigationWhenLoggedIn from "../fixtures/navigationWhenLoggedIn.json";

describe("first cypress block", () => {
    // it("first test", () => {
    //     expect(true).to.eq(true);
    // });

    // it("first test", () => {
    //     expect(true).to.eq(false);
    // });

    it("visit vivify scrum", () => {
        cy.visit("/", { timeout: 30000 });
    });
    it("without credentials", () => {
        cy.get(loginPage.emailInput).clear();
        cy.get(loginPage.passwordInput).clear();
        cy.get(loginPage.loginButton).click();
        cy.url().should("contain", "/login");
    });
    it("without email", () => {
        cy.get(loginPage.emailInput).clear();
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.url().should("contain", "/login");
    });
    it("without password", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear();
        cy.get(loginPage.loginButton).click();
        cy.url().should("contain", "/login");
    });
    it("with invalid email", () => {
        cy.get(loginPage.emailInput).clear().type(data.invalidUser.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.url().should("contain", "/login");
    });
    it("with invalid password", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.invalidUser.password);
        cy.url().should("contain", "/login");
    });
    it("valid login", () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.url().should("not.contain", "/login");
    });
    it("logout", () => {
        cy.get(sidebar.accountSettings).click();
        cy.get(account.accountSidebar.profile).click();
        cy.get(navigationWhenLoggedIn.accountNavigation.logoutButton).click();
        cy.url().should("contain", "/login");
    });
});
