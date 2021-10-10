/// <reference types = "Cypress" />

import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import board from "../fixtures/board.json";

describe("board", () => {
    it("create board", () => {
        cy.visit("/", { timeout: 30000 });
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.url().should("not.contain", "/login");
        cy.get(board.newBoard.addNewBoard).click().then(() => {
            for(let i = 0; i < 5; i++){
                if(i === 0){
                    cy.get(board.newBoard.boardTitle).type(data.board.title);
                };
                if(i === 1){
                    cy.get(board.newBoard.boardType.scrum).click();
                }
                cy.get(board.newBoard.nextButton).click();
            }    
        });
        cy.url().should("contain", "/boards");
    });
});
