/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import data from "../fixtures/data.json";
import signUp from "../fixtures/sign-up.json";
import registration from "../models/registerModule";
import errorMessages from "../fixtures/errorMessages.json";

describe("register", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.url().should("contain", "cypress.vivifyscrum-stage.com");
        cy.get(loginPage.signUpLink).click();
        cy.get("body").then(($body) => {
            if ($body.find(navigationForDashboard.cookieGotIt).length > 0) {
                cy.get(navigationForDashboard.cookieGotIt).should("exist");
              //evaluates as true if button exists at all
              cy.get(navigationForDashboard.cookieGotIt).then(($header) => {
                //you get here only if button EXISTS but is VISIBLE
                if ($header.is(":visible")) {
                    cy.get(navigationForDashboard.cookieGotIt).should("be.visible");
                } else {
                  //you get here only if button EXISTS but is INVISIBLE
                  cy.get(navigationForDashboard.cookieGotIt).should("not.be.visible");
                }
              });
            } else {
              //you get here only if button doesnt EXISTS
            }
          });
          cy.get(navigationForDashboard.starterPack).click({force: true});
        cy.url().should("contain", "/sign-up");
    });
    it("without credentials", () => {
        registration.register({email: "", password: "", numberOfUsers: "", termsAndPrivacy: "unchecked"});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Your Email", errorMessages.invalidEmail);
        cy.errorMessageFunction("Password", errorMessages.requiredPassword);
        cy.errorMessageFunction("Number of users", errorMessages.requiredNumberOfUsers);
        cy.errorMessageWithoutLabel(errorMessages.termsAndPrivacy);
    });
    it("without email", () => {
        registration.register({email: ""});
        cy.url().should("contain", "/sign-up");
        cy.get(signUp.forms).then(() => {
        cy.errorMessageFunction("Your Email", errorMessages.invalidEmail);
        });
    });
    it("without password", () => {
        registration.register({password: ""});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Password", errorMessages.requiredPassword);
    });
    it("without number of users", () => {
        registration.register({numberOfUsers: ""});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Number of users", errorMessages.requiredNumberOfUsers);
    });
    it("without terms and privacy checked", () => {
        registration.register({termsAndPrivacy: "unchecked"});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageWithoutLabel(errorMessages.termsAndPrivacy);
    });
    it("with email without @", () => {
        registration.register({email: data.registerInvalidUser["emailWithout@"]});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Your Email", errorMessages.invalidEmail);
    });
    it("with email without .", () => {
        registration.register({email: data.registerInvalidUser["emailWithout."]});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Your Email", errorMessages.invalidEmail);
    });
    it("with existing email", () => {
        registration.register({email: data.user.email});
        cy.url().should("contain", "/sign-up");
        cy.alertErrorMessage(errorMessages.existingEmail);
    });
    it("with password less than 5 characters", () => {
        registration.register({password: data.registerInvalidUser.passwordLessThan5Chars});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Password", errorMessages.invalidPassword5Characters);
    });
    it("with number of users less than 1", () => {
        registration.register({numberOfUsers: data.registerInvalidUser.numOfUsersLessThan1});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Number of users", errorMessages.invalidNumberInteger);
    });
    it("with number of users more than 10", () => {
        registration.register({numberOfUsers: data.registerInvalidUser.numOfUsersMoreThan10});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Number of users", errorMessages.invalidNumberInteger);
    });
    it("with number of users not an integer", () => {
        registration.register({numberOfUsers: data.registerInvalidUser.numOfUsersNotInteger});
        cy.url().should("contain", "/sign-up");
        cy.errorMessageFunction("Number of users", errorMessages.invalidNumberString);
    });
    it("with valid credentials", () => {
        cy.intercept("POST", "api/v2/register").as("registeredUser")
        registration.register({});
        cy.url().should("not.contain", "/sign-up").and("contain", "/my-organizations");
        cy.wait("@registeredUser").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        });
    });
});
