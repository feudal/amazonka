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
});
