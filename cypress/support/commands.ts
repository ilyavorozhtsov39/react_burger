Cypress.Commands.add("prepare", () => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" })
    cy.intercept("GET", "user", { fixture: "user" }).as("userInfo")
    cy.intercept("POST", "orders", { fixture: "orders" })
    cy.visit('http://localhost:3000/');
    cy.wait("@userInfo").its("response.body").should("deep.equal", {
        success: true,
        user: {
            email:"some@mail.ru",
            name:"john"
        }
    })
});
