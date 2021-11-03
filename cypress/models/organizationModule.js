import data from "../fixtures/data.json";

let organizationID;

module.exports = {
    get addNewOrganization(){
        return cy.get(".vs-c-my-organization--add-new");
    },
    get boardCreatedOkButton(){
        return cy.get(".vs-c-modal--features-button > .vs-c-btn");
    },
    get deleteClick(){
        return cy.get(".vs-c-btn--warning");
    },
    createOrganization(){
        cy.intercept("POST", "api/v2/organizations").as("createdOrganization");
        this.addNewOrganization.click();
        cy.getElementFunction("input", "name", "name").type(data.organization.name);
        cy.getElementFunction("button", "name", "next_btn").click();
        cy.getElementFunction("button", "name", "next_btn").click();
        this.boardCreatedOkButton.click();
        cy.wait("@createdOrganization").then((intercept) => {
            organizationID = intercept.response.body.id;
            expect(intercept.response.body.name).to.eq(data.organization.name);
            expect(intercept.response.statusCode).to.eq(200);
        });
    },
    deleteOrganization(){
        cy.getElementFunction("a", "href", `/organizations/${organizationID}/settings`).click();
        this.deleteClick.click();
        cy.getElementFunction("input", "type", "password").type(data.user.password);
        cy.getElementFunction("button", "name", "save-btn").click();
        cy.url().should("not.contain", "/organizations");
    }
}