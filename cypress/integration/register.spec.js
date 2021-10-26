/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import register from "../fixtures/sign-up.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import data from "../fixtures/data.json";
import errorMessages from "../fixtures/errorMessages.json";
import signUp from "../fixtures/sign-up.json";

describe("register", () => {
    before(() => {
        cy.visit("/");
        cy.url().should("contain", "cypress.vivifyscrum-stage.com");
        cy.get(loginPage.signUpLink).click();
        let elementExists = document.getElementById(navigationForDashboard.cookieGotIt);
        if(elementExists){
            cy.get(navigationForDashboard.cookieGotIt).click();
        }
        cy.get(navigationForDashboard.starterPack).click({force: true});
        cy.url().should("contain", "/sign-up");

    });
    it("without credentials", () => {
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(0).should("be.visible").and("have.text", errorMessages.invalidEmail);
            cy.get(signUp.errorMessages).eq(1).should("be.visible").and("have.text", errorMessages.requiredPassword);
            cy.get(signUp.errorMessages).eq(2).should("be.visible").and("have.text", errorMessages.requiredNumberOfUsers);
        });
        
    });
    it("without email", () => {
        cy.get(register.emailInput).clear();
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(0).should("be.visible").and("have.text", errorMessages.invalidEmail);
        });
    });
    it("without password", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear();
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(1).should("be.visible").and("have.text", errorMessages.requiredPassword);
        });        
    });
    it("without number of users", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear();
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(2).should("be.visible").and("have.text", errorMessages.requiredNumberOfUsers);
        });
    });
    it("with email without @", () => {
        cy.get(register.emailInput).clear().type(data.registerInvalidUser["emailWithout@"]);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(0).should("be.visible").and("have.text", errorMessages.invalidEmail);
        });
    });
    it("with email without .", () => {
        cy.get(register.emailInput).clear().type(data.registerInvalidUser["emailWithout."]);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(0).should("be.visible").and("have.text", errorMessages.invalidEmail);
        });
    });
    it("with existing email", () => {
        cy.get(register.emailInput).clear().type(data.user.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.existingMail).eq(0).should("be.visible").and("have.text", errorMessages.existingEmail);
        });
    });
    it("with password less than 5 characters", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerInvalidUser.passwordLessThan5Chars);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(1).should("be.visible").and("have.text", errorMessages.invalidPassword5Characters);
        });

    });
    it("with number of users less than 1", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersLessThan1);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(2).should("be.visible").and("have.text", errorMessages.invalidNumberInteger);
        });

    });
    it("with number of users more than 10", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersMoreThan10);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(2).should("be.visible").and("have.text", errorMessages.invalidNumberInteger);
        });
    });
    it("with number of users not an integer", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerInvalidUser.numOfUsersNotInteger);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
            cy.get(signUp.errorMessages).eq(2).should("be.visible").and("have.text", errorMessages.invalidNumberString);
        });
    });
    it("with valid credentials", () => {
        cy.get(register.emailInput).clear().type(data.registerUser.email);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("not.contain", "/sign-up");
    });
});
