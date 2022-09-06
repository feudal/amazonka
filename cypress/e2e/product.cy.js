import { faker } from "@faker-js/faker";

describe("Test product editing", () => {
  const email = "admin@example.com";
  const password = "111111";

  beforeEach(() => {
    cy.login(email, password);
  });

  it("See all products", () => {
    let count = 0;
    cy.visit("/admin/products");
    cy.get("table")
      .find("tr")
      .then((row) => (count = row.length));
    cy.get("table button")
      .eq(faker.datatype.number({ min: 0, max: count }))
      .should("have.text", "Edit")
      .click();
  });

  it("Edit product", () => {
    let count = 0;
    const randomNr = faker.datatype.number({ min: 0, max: 10 });
    cy.visit("/admin/products");
    cy.get("table")
      .find("tr")
      .then((row) => (count = row.length));

    cy.get("table").find("tr").should("have.length.greaterThan", 1);
    cy.get("table button").eq(randomNr).should("have.text", "Edit").click();

    const name = faker.commerce.productName();
    const price = faker.commerce.price();
    const quantity = faker.datatype.number({ min: 1, max: 100 });
    const description = faker.commerce.productDescription();

    cy.get("input[name=name]").clear().type(name);
    cy.get("input[name=slug]").clear().type(name.replace(" ", "-"));
    cy.get("input[name=price]").clear().type(price);
    cy.get("input[name=countInStock]").clear().type(quantity);
    cy.get("textarea[name=description]").clear().type(description);
    cy.get("form button.primary-button").should("have.text", "Save").click();

    cy.messageToastShouldBe("Product updated");

    cy.get("table tr")
      .eq(randomNr + 1)
      .should("contain.text", name)
      .and("contain.text", Number(price).toFixed(0))
      .and("contain.text", quantity);
  });
});
