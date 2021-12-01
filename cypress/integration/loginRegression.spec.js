import userApi from "../api/user";
import data from "../fixtures/data.json";

describe("Api testing", () => {
    let userToken;
    before("positive login", () => {
        userApi.login({ testMessage: "01 - Login before tests" }).then((token) => {
            userToken = token;
        });
    });
    it("wrong email without @", () => {
        userApi.login({
            email: data.registerInvalidUser["emailWithout@"],
            testMessage: "02 - Wrong email without @",
            statusCode: 401,
        });
    });
    it("wrong email without .com", () => {
        userApi.login({
            email: data.registerInvalidUser["emailWithout."],
            testMessage: "03 - Wrong email without .com",
            statusCode: 401,
        });
    });
    it("Wrong email with space infornt", () => {
        userApi.login({
            email: data.registerInvalidUser.emailWithSpaceInfront,
            testMessage: "04 - Wrong email with space infornt",
            statusCode: 401,
        });
    });
    it("Wrong password", () => {
        userApi.login({
            password: data.invalidUser.password,
            testMessage: "05 - Wrong password",
            statusCode: 401,
        });
    });
});
