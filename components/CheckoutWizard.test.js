import { render, screen } from "@testing-library/react";

import { CheckoutWizard } from ".";

describe("CheckoutWizard", () => {
  render(<CheckoutWizard />);
  const checkoutWizard = screen.getByTestId("checkout-wizard");
  it("should render", () => {
    expect(checkoutWizard).toBeInTheDocument();
  });
});
