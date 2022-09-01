import { render, screen } from "@testing-library/react";

import { Modal } from ".";

describe("Modal", () => {
  render(<Modal open title={"title"} onClose={() => {}} />);
  const modal = screen.getByTestId("modal");
  it("should render", () => {
    expect(modal).toBeInTheDocument();
  });
});
