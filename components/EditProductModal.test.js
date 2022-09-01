import { render, screen } from "@testing-library/react";

import { EditProductModal } from ".";
import { data } from "../utils";

describe("EditProductModal", () => {
  render(
    <EditProductModal
      open
      title={"title"}
      onClose={() => {}}
      product={data.products[0]}
    />
  );
  const editProductModal = screen.getByTestId("edit-product-modal");
  it("should render", () => {
    expect(editProductModal).toBeInTheDocument();
  });
});
