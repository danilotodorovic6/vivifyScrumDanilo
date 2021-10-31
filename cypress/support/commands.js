// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("errorMessageFunction", (errorSection, errorMessage) => {
    cy.get(".el-form-item")
    .contains(errorSection)
    .parent()
    .find(".el-form-item__error")
    .should("be.visible")
    .and("have.text", errorMessage);
});
Cypress.Commands.add("errorMessageWithoutLabel", (errorMessage) => {
    cy.get(".el-form-item__error")
    .last()
    .should("be.visible")
    .and("have.text", errorMessage);
});
Cypress.Commands.add("getElementFunction", (element, attribute, value) => {
    return cy.get(`${element}[${attribute}='${value}']`);
});
Cypress.Commands.add("alertErrorMessage", (errorMessage) => {
    cy.get(".el-message")
    .should("be.visible")
    .and("contain", errorMessage);
});
