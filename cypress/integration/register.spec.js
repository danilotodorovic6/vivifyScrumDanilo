/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import register from "../fixtures/sign-up.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import data from "../fixtures/data.json";

describe("register", () => {
    it("visit", () => {
        cy.visit("/");
        cy.get(loginPage.signUpLink).click();
        cy.get(navigationForDashboard.starterPack).first().click({force:true});
        cy.url().should("contain", "/sign-up");
    });
    it("without credentials", () => {
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("without email", () => {
        cy.get(register.emailInput).clear();
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("without password", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear();
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("without number of users", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear();
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with email without @", () => {
        cy.get(register.emailInput).clear().type(data.registerInvalidUser["emailWithout@"]);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with email without .", () => {
        cy.get(register.emailInput).clear().type(data.registerInvalidUser["emailWithout."]);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with existing email", () => {
        cy.get(register.emailInput).clear().type(data.user.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with password less than 5 characters", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerInvalidUser.passwordLessThan5Chars);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with number of users less than 1", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersLessThan1);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with number of users more than 10", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersMoreThan10);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with number of users not an integer", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersNotInteger);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
    });
    it("with valid credentials", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("not.contain", "/sign-up");
    });
});