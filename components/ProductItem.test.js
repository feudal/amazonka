import { render, screen } from "@testing-library/react";

import { ProductItem } from ".";
import { data } from "../utils";

const product = data.products[0];

describe("ProductItem", () => {
  render(<ProductItem product={product} />);
  const productItem = screen.getByTestId("product-item");

  it("should render", () => {
    expect(productItem).toBeInTheDocument();
  });
  it("should be a div", () => {
    expect(productItem.tagName).toBe("DIV");
  });
  it("should have 2 a", () => {
    expect(productItem.getElementsByTagName("a").length).toBe(2);
  });
  it("should have 1 img", () => {
    expect(productItem.getElementsByTagName("img").length).toBe(1);
  });
  it("should have 1 button", () => {
    expect(productItem.getElementsByTagName("button").length).toBe(1);
  });
});
