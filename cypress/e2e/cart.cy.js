describe("Test cart", () => {
  const email = "admin@example.com";
  const password = "111111";

  beforeEach(() => {
    cy.login(email, password);
  });

  it("Add product to cart", () => {
    cy.selectProduct();
  });

  it("Check number of products in cart", () => {
    cy.selectProduct();
    cy.get("span.badge").should("have.text", "1");
  });

  it("Remove product from cart", () => {
    cy.selectProduct();
    cy.get("span.badge").should("have.text", "1");
    cy.get("td button").click();
    cy.get("main div").should("contain.text", "Cart is empty");
  });
  it("Adding few products to cart on main page", () => {
    for (let i = 0; i < 5; i++) {
      cy.addProductInCart();
      cy.get(".Toastify__toast-body div")
        .eq(1)
        .should("have.text", "Product added to cart");
      cy.get("span.badge").should("have.text", (i + 1).toString());
    }
  });
});
