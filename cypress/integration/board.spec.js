/// <reference types = "Cypress" />

import authModule from "../models/authModule";
import board from "../models/boardModule";



describe("board", () => {
    before(() => {
        cy.visit("/", { timeout: 30000 });
        authModule.login({});
        cy.url().should("not.contain", "/login");
    });
    it("create board", () => {
        board.createBoard();
    });
    it("adding new column", () => {
        board.addColumn();
    });
    it("adding a story", () => {
        board.addStory();
    });
    it("editing story", () => {
        board.editStory();
    });
    it("moving story to backlog", () => {
        board.movingStoryToBacklog();
    });
    it("delete story", () => {
        board.deleteStory();
    });
    it("delete board", () => {
        board.deleteBoard();
    });
});
