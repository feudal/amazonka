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

Cypress.Commands.add("messageToastShouldBe", (text) => {
  cy.get(".Toastify__toast-body div").eq(1).should("have.text", text);
});

//paypal
/**
 * Returns an iframe content
 */
Cypress.Commands.add("iframe", { prevSubject: "element" }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.ready(function () {
      resolve($iframe.contents().find("body"));
    });
  });
});

// Used to keep the reference to the popup window
const state = {};

/**
 * Intercepts calls to window.open() to keep a reference to the new window
 */
Cypress.Commands.add("capturePopup", () => {
  cy.window().then((win) => {
    const open = win.open;
    cy.stub(win, "open").callsFake((...params) => {
      // Capture the reference to the popup
      state.popup = open(...params);
      return state.popup;
    });
  });
});

/**
 * Returns a wrapped body of a captured popup
 */
Cypress.Commands.add("popup", () => {
  const popup = Cypress.$(state.popup.document);
  return cy.wrap(popup.contents().find("body"));
});

/**
 * Clicks on PayPal button and signs in
 */
Cypress.Commands.add("paypalFlow", (email, password) => {
  // Enable popup capture
  cy.capturePopup();
  // Click on the PayPal button inside PayPal's iframe
  cy.get("iframe")
    .iframe()
    .find('div[data-funding-source="paypal"]')
    .eq(0)
    .click();
  // It will first inject a loader, wait until it changes to the real content
  cy.popup().find("div").should("not.exist").wait(1000); // Not recommended, but the only way I found to wait for the real content
  cy.popup().then(($body) => {
    // Check if we need to sign in
    if ($body.find("input#email").length) {
      cy.popup().find("input#email").clear().type(email);
      // Click on the button in case it's a 2-step flow
      cy.popup().find("button:visible").first().click();
      cy.popup().find("input#password").clear().type(password);
      cy.popup().find("button#btnLogin").click();
    }
  });
  cy.popup().find("button#btnLogin").should("not.exist");
  cy.wait(1000);
  // cy.popup().find("div.reviewButton").should("exist");
});

/**
 * Returns the price shown in PayPal's summary
 */
Cypress.Commands.add("paypalPrice", () => {
  return cy.popup().find("span#totalWrapper");
});

/**
 * Completes PayPal flow
 */
Cypress.Commands.add("paypalComplete", () => {
  cy.popup().find("ul.charges").should("not.to.be.empty");
  cy.wait(1000);
  cy.popup().find("button.continueButton").click();
  cy.popup().find('input[data-test-id="continueButton"]').click();
});
