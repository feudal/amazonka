import { faker } from "@faker-js/faker";

describe("Payment", () => {
  const email = "admin@example.com";
  const password = "111111";
  const name = faker.name.fullName();
  const country = faker.address.country();
  const city = faker.address.city();
  const address = faker.address.streetAddress();
  const zip = faker.address.zipCode();

  beforeEach(() => {
    cy.login(email, password);
  });

  it("Flow", () => {
    cy.selectProduct().wait(1000);
    cy.get(".card button").click().wait(300);

    //complete shipping form
    cy.get("input[name=fullName]").type(name);
    cy.get("input[name=country]").type(country);
    cy.get("input[name=city]").type(city);
    cy.get("input[name=address]").type(address);
    cy.get("input[name=postalCode]").type(zip);
    cy.get("button.primary-button").click();

    //complete payment form
    cy.get("label[for=Stripe]").click().wait(300);
    cy.get("button.primary-button").click().wait(300);
    cy.get("button.primary-button").click().wait(300);

    //check if information is correct
    cy.get("[data-testid=shipping-info]")
      .should("contain", name)
      .should("contain", country)
      .should("contain", city)
      .should("contain", address)
      .should("contain", zip);

    //pay with Paypal...
  });
});
