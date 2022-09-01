import { Menu } from "@headlessui/react";
import { render, screen } from "@testing-library/react";

import { DropdownLink } from ".";

describe("DropdownLink", () => {
  render(<DropdownLink href="/test">test</DropdownLink>);

  const dropdownLink = screen.getByTestId("dropdown-link");
  it("should render", () => {
    expect(dropdownLink).toBeInTheDocument();
  });
});
