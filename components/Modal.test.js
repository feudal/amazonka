import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";

import { Modal } from ".";

const title = faker.lorem.sentence();
const button = faker.lorem.word();

describe("Modal", () => {
  render(<Modal open title={title} onClose={() => {}} button={button} />);
  const modal = screen.getByTestId("modal");

  it("should render", () => {
    expect(modal).toBeInTheDocument();
  });
  it("should have title as props title", () => {
    expect(modal.textContent).toContain(title);
  });
  it("should have button as props button", () => {
    expect(modal.textContent).toContain(button);
  });
});
