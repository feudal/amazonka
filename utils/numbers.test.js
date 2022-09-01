import { round2 } from "./numbers";

describe("round2", () => {
  it("should round to 2 decimal places", () => {
    expect(round2(1.005)).toBe(1.01);
    expect(round2(1.004)).toBe(1);
  });
});
