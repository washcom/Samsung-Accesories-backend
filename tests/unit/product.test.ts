import { Product } from "../../src/modules/products/product.model";

describe("product model", () => {
  it("requires key product fields", () => {
    const product = new Product({});
    const error = product.validateSync();

    expect(error?.errors.name).toBeDefined();
    expect(error?.errors.description).toBeDefined();
    expect(error?.errors.price).toBeDefined();
    expect(error?.errors.category).toBeDefined();
  });
});
