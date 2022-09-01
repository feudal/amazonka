import { faker } from "@faker-js/faker";
import { getError } from ".";

const error = faker.random.words();
describe("getError", () => {
  it("should return error message", () => {
    expect(getError({ message: error })).toBe(error);
  });
  it("should return error response data message", () => {
    expect(getError({ response: { data: { message: error } } })).toBe(error);
  });
});
