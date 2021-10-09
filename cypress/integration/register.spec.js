/// <reference types = "Cypress" />
import loginPage from "../fixtures/login.json";
import register from "../fixtures/sign-up.json";
import navigationForDashboard from "../fixtures/navigationForDashboard.json";

describe("register", () => {
    it("visit", () => {
        cy.visit("/");
        cy.get(loginPage.signUpLink).click();
    })
    it("register without credentials", () => {
        cy.get(navigationForDashboard.starterPack).invoke("show").first().click();
    })
})