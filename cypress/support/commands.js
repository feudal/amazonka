import { faker } from "@faker-js/faker";

//auth
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get("button").should("have.text", "Login").click();
  cy.wait(300);
});

Cypress.Commands.add("register", (name, email, password) => {
  cy.visit("/register");
  cy.get("#name").type(name);
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get("input[name=confirmPassword]").type(password);
  cy.get("button").should("have.text", "Register").click();
  cy.wait(300);
});

//product
Cypress.Commands.add("selectProduct", () => {
  cy.visit("/");
  cy.get("[data-testid=product-item]")
    .eq(faker.random.numeric(1))
    .click()
    .wait(300);
  cy.get(".card button").click();
});

Cypress.Commands.add("addProductInCart", () => {
  cy.get("[data-testid=product-item] button")
    .eq(faker.random.numeric(1))
    .click();
});
