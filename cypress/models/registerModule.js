import faker from "faker";

let randomUser = {
    email: faker.internet.email(),
    password: faker.internet.password()
}

module.exports = {
    register({email = randomUser.email, password = randomUser.password, numberOfUsers = 6, termsAndPrivacy = "checked"}){
        if(email == "" && password == "" && numberOfUsers == "" && termsAndPrivacy == "unchecked"){
            cy.getElementFunction("input", "type", "checkbox").click({force: true});
            cy.getElementFunction("button", "type", "submit").click();
        }
        else if(email == ""){
            cy.getElementFunction("input", "type", "password").type(password);
            cy.getElementFunction("input", "name", "number_of_users").type(numberOfUsers);
            cy.getElementFunction("button", "type", "submit").click();
        }
        else if(password == ""){
            cy.getElementFunction("input", "type", "email").type(email);
            cy.getElementFunction("input", "name", "number_of_users").type(numberOfUsers);
            cy.getElementFunction("button", "type", "submit").click();    
        }
        else if(numberOfUsers == ""){
            cy.getElementFunction("input", "type", "email").type(email);
            cy.getElementFunction("input", "type", "password").type(password);
            cy.getElementFunction("button", "type", "submit").click();    
        }
        else if(termsAndPrivacy == "unchecked"){
            cy.getElementFunction("input", "type", "email").type(email);
            cy.getElementFunction("input", "type", "password").type(password);
            cy.getElementFunction("input", "name", "number_of_users").type(numberOfUsers);
            cy.getElementFunction("input", "type", "checkbox").click({force: true});
            cy.getElementFunction("button", "type", "submit").click();    
        }
        else{
            cy.getElementFunction("input", "type", "email").type(email);
            cy.getElementFunction("input", "type", "password").type(password);
            cy.getElementFunction("input", "name", "number_of_users").type(numberOfUsers);
            cy.getElementFunction("button", "type", "submit").click();    
        }
    }
}