import { render, screen } from "@testing-library/react";

import { CheckoutWizard } from ".";
import { PAYMENT_STEPS } from "../utils";

describe("CheckoutWizard", () => {
  render(<CheckoutWizard />);
  const checkoutWizard = screen.getByTestId("checkout-wizard");
  it("should render", () => {
    expect(checkoutWizard).toBeInTheDocument();
  });
  it("should have 4 steps", () => {
    expect(checkoutWizard.children.length).toBe(4);
  });
  it("should include all steps", () => {
    for (let i = 0; i < checkoutWizard.children.length; i++) {
      expect(checkoutWizard.children[i].textContent).toBe(PAYMENT_STEPS[i]);
    }
  });
});
