import faker from "faker";
import color from "../support/consoleColor";

module.exports = {
    get({ token = "", testMessage  = "", statusCode = 200 }){
        return cy.request({
            method: "GET",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
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
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: boardName,
                type: "scrum_board",
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
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name: boardName,
                description: null,
                code: boardCode,
                task_unit: "points"
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
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(statusCode);
        })
    }
}

