import { queryStringToObject } from "_utils";

describe("String Utilities", () => {
  describe("queryStringToObject", () => {
    it("should return an empty object when not give a query string", () => {
      expect(queryStringToObject()).toEqual({});
    });

    it("should return a key value pair when string begins with '?'", () => {
      expect(queryStringToObject("?a=5")).toEqual({ a: "5" });
    });

    it("should return a key value pair when string does not begin with '?'", () => {
      expect(queryStringToObject("a=5")).toEqual({ a: "5" });
    });

    it("should return a key with empty string value when value missing", () => {
      expect(queryStringToObject("?a=1&b=")).toEqual({ a: "1", b: "" });
    });

    it("should ignore missing keys", () => {
      expect(queryStringToObject("?=1&b=2")).toEqual({ b: "2" });
    });

    it("should decode values", () => {
      expect(queryStringToObject("?a=spaces%20decoded")).toEqual({ a: "spaces decoded" });
    });
  });
});
