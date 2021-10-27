/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import register from "../fixtures/sign-up.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";
import data from "../fixtures/data.json";
import errorMessages from "../fixtures/errorMessages.json";
import signUp from "../fixtures/sign-up.json";

let faker = require("faker");
let randomEmail = faker.internet.email();

describe("register", () => {
    before(() => {
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
    it.only("with valid credentials", () => {
        cy.intercept("POST", "api/v2/register").as("registeredUser")
        cy.get(register.emailInput).clear().type(randomEmail);
        cy.get(register.passwordInput).clear().type(data.registerUser.password);
        cy.get(register.numberOfUsersInput).clear().type(data.registerUser.numOfUsers);
        cy.get(register.startYourFreeTrialButton).click();
        cy.url().should("not.contain", "/sign-up").and("contain", "/my-organizations");
        cy.wait("@registeredUser").then((intercept) => {
            expect(intercept.request.body.email).to.eq(randomEmail);
            expect(intercept.response.statusCode).to.eq(200)
        })
    });
});
