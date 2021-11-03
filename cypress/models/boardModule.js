import data from "../fixtures/data.json";

let boardID;
let taskID;
let commentID;


module.exports = {
    get addColumnBtn(){
        return cy.get(".vs-add-column-btn-gap button");
    },
    get addTaskBtn(){
        return cy.get(".vs-c-col:nth-of-type(3) .vs-c-task-list button");
    },
    get createdTask(){
        return cy.get(".vs-u-padding--sm");
    },
    get taskTitle(){
        return cy.get(".vs-c-task__title .vue-simple-markdown");
    },
    get backlog(){
        return cy.get(".vs-c-dropdown li:nth-of-type(1)");
    },
    get deleteBoardBtn(){
        return cy.get(".vs-c-btn--warning");
    },
    get boardDeletedOkButton(){
        return cy.get(".vs-c-modal--features-button > .vs-c-btn");
    },
    createBoard(){
        cy.intercept("POST", "api/v2/boards").as("boardCreated");
        cy.getElementFunction("li", "title", "Add new Board").click().then(() => {
            for(let i = 0; i < 4; i++){
                if(i === 0){
                    cy.getElementFunction("input", "name", "name").type(data.board.title);
                };
                if(i === 1){
                    cy.getElementFunction("span", "name", "type_scrum").click();
                };
                cy.getElementFunction("button", "name", "next_btn").click();
            };    
            cy.url().should("contain", "/boards");
            cy.wait("@boardCreated").then((intercept) => {
                boardID = intercept.response.body.id;
                expect(intercept.response.body.name).to.eq(data.board.title);
                expect(intercept.response.statusCode).to.eq(201);
            });    
        });
    },
    addColumn(){
        cy.intercept("POST", `api/v2/boards/${boardID}/sprints`).as("columnAdded")
        this.addColumnBtn.click().type(data.board.column + "{enter}");
        cy.wait("@columnAdded").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.column);
            expect(intercept.response.statusCode).to.eq(201);
        });
    },
    addStory(){
        cy.intercept("POST", "api/v2/tasks").as("storyAdded");
        this.addTaskBtn.click({force: true});
        cy.getElementFunction("textarea", "name", "item_name").type(data.board.task);
        cy.getElementFunction("button", "name", "new_item_save").click({force: true});
        cy.wait("@storyAdded").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.task);
            expect(intercept.response.statusCode).to.eq(201);
            taskID = intercept.response.body.id;
        });
    },
    editStory(){
        cy.intercept("POST", `api/v2/tasks/${taskID}/comments`).as("commentAdded");
        this.createdTask.last().click();
        //editing task title
        this.taskTitle.click();
        cy.getElementFunction("textarea", "name", "item_name").clear().type(data.board.task + "2");
        cy.getElementFunction("button", "name", "item_name_save").click();
        //adding task description
        cy.intercept("PUT", `api/v2/tasks/${taskID}`).as("taskEdited");
        cy.getElementFunction("button", "name", "item_description_edit").click();
        cy.getElementFunction("textarea", "name", "description").type(data.board.description);
        cy.getElementFunction("button", "name", "item_description_save").click();
        cy.wait("@taskEdited").then((intercept) => {
            expect(intercept.response.body.name).to.eq(data.board.task + "2");
            expect(intercept.response.body.description).to.eq(data.board.description);
            expect(intercept.response.statusCode).to.eq(200);
        });
        //adding comment
        cy.getElementFunction("textarea", "name", "new_comment").click().type(data.board.comment);
        cy.getElementFunction("button", "name", "comment_save").click();
        cy.wait("@commentAdded").then((intercept) => {
            expect(intercept.response.body.body).to.eq(data.board.comment);
            expect(intercept.response.statusCode).to.eq(201);
            commentID = intercept.response.body.id;
        });
        //deleting comment
        cy.getElementFunction("button", "name", "delete_comment").click({force: true});
        cy.getElementFunction("button", "name", "save-btn").click();
    },
    movingStoryToBacklog(){
        cy.getElementFunction("div", "name", "sprint-info-dropdown").click();
        this.backlog.click();
    },
    deleteStory(){
        cy.getElementFunction("div", "title", "Options").click();
        cy.getElementFunction("li", "name", "delete-option").click();
        cy.getElementFunction("button", "name", "save-btn").click();        
    },
    deleteBoard(){
        cy.getElementFunction("a", "href", `/boards/${boardID}/settings`).click(); 
        this.deleteBoardBtn.click();
        cy.getElementFunction("button", "name", "save-btn").click();    
        this.boardDeletedOkButton.click();    
    }
}