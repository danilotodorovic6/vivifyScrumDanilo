import userApi from "../api/user";
import boardApi from "../api/board";

describe("Api testing boards", () => {
    let userToken;
    before(() => {
        userApi.login({ testMessage: "01-Login before other tests" }).then((token) => {
            userToken = token;
        });
    });
    let boardCode;
    it("Create board", () => {
        boardApi
            .post({ 
                token: userToken,
                testMessage: "02 - Create board",
            })
            .then((response) => {
                boardCode = response.code;
            })

    });
    let boardsIDs = [];
    it("Get boards", () => {
        boardApi
            .get({ 
                token: userToken,
                testMessage: "03 - Getting all boards" 
            })
            .then((allBoards) => {
                allBoards.forEach((board) => {
                    boardsIDs.push(board.id);
                })
            });
    });
    it("Edit last board", () => {
            boardApi.put({
                token: userToken,
                testMessage: "04 - Edit last board",
                boardCode: boardCode,
                boardID: boardsIDs[boardsIDs.length - 1]})
    });
    after("Delete all boards", () => {
        for(let i = 0; i < boardsIDs.length; i++){
            boardApi.delete({
                token: userToken,
                testMessage: "05 - Delete all boards",
                boardID: boardsIDs[i]
            })
        }
        boardApi.get({token: userToken, testMessage: "06 - Check if boards are deleted"})
        .then((allBoards) => {
            expect(allBoards).to.have.length(0);
        });
    });
});