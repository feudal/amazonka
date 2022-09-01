import { render, screen } from "@testing-library/react";

import { EditProductModal } from ".";
import { data } from "../utils";

const product = data.products[0];

describe("EditProductModal", () => {
  render(
    <EditProductModal
      open
      title={"title"}
      onClose={() => {}}
      product={product}
    />
  );
  const editProductModal = screen.getByTestId("edit-product-modal");
  it("should render", () => {
    expect(editProductModal).toBeInTheDocument();
  });
  it("should be a form", () => {
    expect(editProductModal.tagName).toBe("FORM");
  });
  it("should have 7 label", () => {
    expect(editProductModal.getElementsByTagName("label").length).toBe(7);
  });
  it("should have 6 inputs", () => {
    expect(editProductModal.getElementsByTagName("input").length).toBe(6);
  });
  it("should have 1 textarea", () => {
    expect(editProductModal.getElementsByTagName("textarea").length).toBe(1);
  });
  it("should have 2 button", () => {
    expect(editProductModal.getElementsByTagName("button").length).toBe(2);
  });
  it("should contain this array of text", () => {
    const text = [
      "Category",
      "Brand",
      "Name",
      "Slug",
      "Price",
      "Amount in stock",
      "Description",
      "Save",
      "Cancel",
    ];
    for (let i = 0; i < text.length; i++) {
      expect(editProductModal.textContent).toContain(text[i]);
    }
  });
  it("should have default values if product is not null", () => {
    if (product) {
      const inputs = editProductModal.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        expect(inputs[i].value).toBeDefined();
      }
    }
  });
});
