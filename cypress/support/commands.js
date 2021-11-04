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
Cypress.Commands.add("checkIfElementExists", (element) => {
    cy.get("body").then(($body) => {
        if ($body.find(element).length > 0) {
            cy.get(element).should("exist");
          //evaluates as true if button exists at all
          cy.get(element).then(($header) => {
            //you get here only if button EXISTS but is VISIBLE
            if ($header.is(":visible")) {
                cy.get(element).should("be.visible").click();
            } else {
              //you get here only if button EXISTS but is INVISIBLE
              cy.get(element).should("not.be.visible");
            };
          });
        } else {
          //you get here only if button doesnt EXISTS
        };
    });
});