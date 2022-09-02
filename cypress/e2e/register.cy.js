import { faker } from "@faker-js/faker";

describe("Test registration", () => {
  const name = faker.name.firstName() + " " + faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  it("Register an account", () => {
    cy.register(name, email, password);
  });

  it("Login with that account", () => {
    cy.login(email, password);
  });

  it("Check that the user is logged in", () => {
    cy.get("nav button").should("have.text", name);
  });

  it("Logout", () => {
    cy.get("nav button").click();
    cy.get("a.dropdown-link a")
      .should("have.text", "Logout")
      .click({ force: true });
    cy.visit("/").wait(300);
    cy.get("nav a").should("not.have.text", name);
  });
});
