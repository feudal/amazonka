import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";

import { DropdownLink } from ".";

describe("DropdownLink", () => {
  const link = faker.internet.url();
  const word = faker.lorem.word();

  render(<DropdownLink href={link}>{word}</DropdownLink>);
  const dropdownLink = screen.getByTestId("dropdown-link");

  it("should render", () => {
    expect(dropdownLink).toBeInTheDocument();
  });
  it("should have a href", () => {
    expect(dropdownLink.getAttribute("href")).toBe(link);
  });
  it("should have a text", () => {
    expect(dropdownLink.textContent).toBe(word);
  });
});
