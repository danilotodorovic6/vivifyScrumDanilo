/// <reference types = "Cypress" />

import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import board from "../fixtures/board.json";

describe("board", () => {
    let boardID;
    let token;
    let taskID;
    let commentID;
    before(() => {
        cy.intercept("api/v2/login").as("userLoggedIn");
        cy.visit("/", { timeout: 30000 });
        cy.get(loginPage.emailInput).clear().type(data.user.email);
        cy.get(loginPage.passwordInput).clear().type(data.user.password);
        cy.get(loginPage.loginButton).click();
        cy.url().should("not.contain", "/login");
        cy.wait("@userLoggedIn").then((intercept) => {
            expect(intercept.request.body.email).to.eq(data.user.email);
            expect(intercept.response.statusCode).to.eq(200);
            token = intercept.response.body.token;
        });
    });
    it("create board", () => {
        cy.intercept("POST", "api/v2/boards").as("boardCreated");
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
        cy.wait("@boardCreated").then((intercept) => {
            boardID = intercept.response.body.id;
            expect(intercept.response.body.name).to.eq(data.board.title);
            expect(intercept.response.statusCode).to.eq(201);
        })
    });
    it("adding new column", () => {
        cy.intercept("POST", `api/v2/boards/${boardID}/sprints`).as("columnAdded")
        cy.get(board.boardTasks.addColumn).click().type(data.board.column + "{enter}");
        cy.wait("@columnAdded").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.column);
            expect(intercept.response.statusCode).to.eq(201);
        })
    });
    it("adding a story", () => {
        cy.intercept("POST", "api/v2/tasks").as("storyAdded");
        cy.get(board.boardTasks.addTask).click({force: true});
        cy.get(board.boardTasks.taskName).type(data.board.task);
        cy.get(board.boardTasks.saveTask).click({force: true});
        cy.wait("@storyAdded").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.task);
            expect(intercept.response.statusCode).to.eq(201);
            taskID = intercept.response.body.id;
        });
    });
    it("editing story", () => {
        cy.intercept("POST", `api/v2/tasks/${taskID}/comments`).as("commentAdded");
        cy.get(board.boardTasks.createdTask).last().click();
        //editing task title
        cy.get(board.boardTasks.taskTitle).click();
        cy.get(board.boardTasks.taskName).clear().type(data.board.task + "2");
        cy.get(board.boardTasks.saveTitle).click();
        //adding task description
        cy.intercept("PUT", `api/v2/tasks/${taskID}`).as("taskEdited");
        cy.get(board.boardTasks.description).click();
        cy.get(board.boardTasks.descriptionText).type(data.board.description);
        cy.get(board.boardTasks.saveDescription).click();
        cy.wait("@taskEdited").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.task + "2");
            expect(intercept.response.body.description).to.eq(data.board.description);
            expect(intercept.response.statusCode).to.eq(200);
        });
        //adding comment
        cy.get(board.boardTasks.comment).click().type(data.board.comment);
        cy.get(board.boardTasks.saveComment).click();
        cy.wait("@commentAdded").then((intercept) => {
            expect(intercept.response.body.body).to.eq(data.board.comment);
            expect(intercept.response.statusCode).to.eq(201);
            commentID = intercept.response.body.id;
        });
    });
    it("Delete comment", () => {
        cy.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "DELETE", 
            url: `api/v2/tasks/${taskID}/comments/${commentID}`
        }).as("deleteComment");
        cy.get("body").then(($body) => {
            expect($body.find(".vs-c-comment__body").length).to.eq(0);            
        });
    })
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
