import faker from "faker";
import color from "../support/consoleColor";
import data from "../fixtures/data.json";

module.exports = {
    get({ token = "", testMessage  = "", statusCode = 200 }){
        return cy.request({
            method: "GET",
            url: `${Cypress.config('apiUrl')}/my-organizations`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
                    ? color.log(`${testMessage} - Pass`, "success")
                    : color.log(
                            `${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
                            "error"
                      );
            expect(response.status).to.eq(statusCode);
            return response.body[0].boards;
        })
    },
    post({ token = "", boardName = faker.name.jobTitle(), testMessage  = "", statusCode = 201, organization_id = 820 }){
        return cy.request({
            method: "POST",
            url: `${Cypress.config('apiUrl')}/boards`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: boardName,
                type: data.board.type,
                organization_id: organization_id,
                configuration_board_id: null,
                team_members_board_id: null
            }
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
                    ? color.log(`${testMessage} - Pass`, "success")
                    : color.log(
                            `${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
                            "error"
                      );
            expect(response.status).to.eq(statusCode);
            return response.body;
        });
    }
    ,
    put({ token = "", boardName = faker.name.jobTitle(), testMessage  = "", statusCode = 200, boardID = "", boardCode = "" }){
        return cy.request({
            method: "PUT",
            url: `${Cypress.config('apiUrl')}/boards/${boardID}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: boardName,
                description: null,
                code: boardCode,
                task_unit: data.board.taskUnit
            }
        }).then((response) => {
            typeof response.status !== "undefined" && response.status === statusCode
                    ? color.log(`${testMessage} - Pass`, "success")
                    : color.log(
                            `${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
                            "error"
                      );
            expect(response.status).to.eq(statusCode);
            return response.body;
        })
    },
    delete({ token = "", boardID = "", testMessage  = "", statusCode = 200 }){
        cy.request({
            method: "DELETE",
            url: `${Cypress.config('apiUrl')}/boards/${boardID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
                typeof response.status !== "undefined" && response.status === statusCode
                ? color.log(`${testMessage} - Pass`, "success")
                : color.log(
                        `${testMessage} - Fail - 
            ${JSON.stringify(response)}`,
                        "error"
                );
            expect(response.status).to.eq(statusCode);
        })
    }
}

