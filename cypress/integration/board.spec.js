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
            for(let i = 0; i < 4; i++){
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
    it("adding new column", () => {
        cy.get(board.boardTasks.addColumn).click().type(data.board.column + "{enter}");
    });
    it("adding a story", () => {
        cy.get(board.boardTasks.addTask).click({force: true});
        cy.get(board.boardTasks.taskName).type(data.board.task);
        cy.get(board.boardTasks.saveTask).click({force: true});
    });
    it("editing story", () => {
        cy.get(board.boardTasks.createdTask).last().click();
        //editing task title
        cy.get(board.boardTasks.taskTitle).click();
        cy.get(board.boardTasks.taskName).clear().type(data.board.task + "2");
        cy.get(board.boardTasks.saveTitle).click();
        //adding task description
        cy.get(board.boardTasks.description).click();
        cy.get(board.boardTasks.descriptionText).type(data.board.description);
        cy.get(board.boardTasks.saveDescription).click();
        //adding comment
        cy.get(board.boardTasks.comment).click().type(data.board.comment);
        cy.get(board.boardTasks.saveComment).click();
        //deleting comment
        cy.get(board.boardTasks.deleteComment).click({force: true});
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
    });
    it("moving story to backlog", () => {
        cy.get(board.boardTasks.changeSprint).click();
        cy.get(board.boardTasks.backlog).click();
    });
    it("delete story", () => {
        cy.get(board.boardTasks.taskOptions).click();
        cy.get(board.boardTasks.deleteOption).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
    })
    it("delete board", () => {
        cy.get(board.boardSidebar.configuration).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.deleteBoardClick).click();
        cy.get(board.boardInfo.boardDetails.deleteBoard.saveButton).click();
        cy.get(board.newBoard.boardDeletedOKButton).click();
    });
});
