import data from "../fixtures/data.json";

module.exports = {
    get emailInput(){
        return cy.get("input[type='email']");
    },
    get passwordInput(){
        return cy.get("input[type='password']");
    },
    get forgotPasswordButton(){
        return cy.get("a[href='/forgot-password']");
    },
    get loginButton(){
        return cy.get("button[type='submit']");
    },
    get backToHomeLink(){
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com']");
    },
    get loginWithGoogleButton(){
        return cy.get(".vs-c-btn--gp");
    },
    get loginWithFacebookButton(){
        return cy.get(".vs-c-btn--fb");
    },
    get loginWithTwiterButton(){
        return cy.get(".vs-c-btn--tw");
    },
    get accountSettings(){
        return cy.get("a[href='/account']");
    },
    get profile(){
        return cy.get("a[href='/account/settings']");
    },
    get logoutButton(){
        return cy.get(".vs-c-logout");
    },
    get errorMessage(){
        return cy.get(".el-form-item__error");
    },
    login({ email = data.user.email, password = data.user.password }) {
        if(email == "" && password == "") {
            this.loginButton.click();
        } 
        else if(email == ""){
            this.passwordInput.should("be.visible").type(password);
            this.loginButton.click();
        }
        else if(password == ""){
            this.emailInput.should("be.visible").type(email);
            this.loginButton.click();
        }
        else {
              cy.intercept("POST", "**/api/v2/login").as("login");
              this.emailInput.should("be.visible").type(email);
              this.passwordInput.should("be.visible").type(password);
              this.loginButton.click();
              if (email == data.user.email && password == data.user.password) {
              cy.wait("@login").then((intercept) => {
                  expect(intercept.response.statusCode).to.eql(200);
                });
              };
        };
    },
    logout(){
        this.accountSettings.click();
        this.profile.click();
        this.logoutButton.click();
    }
}