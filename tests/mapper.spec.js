"use strict";

const Mapper = require("../src/mapper");

describe("The mapper", () => {
  let mapper = new Mapper();
  let sourceObj = {
    name: "test"
  };

  beforeEach(() => {
    mapper = new Mapper();
  });

  test("should map string to property to same property on destination", () => {
    mapper.map("name");

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe("test");

  });

  test("should map string to function", () => {
    mapper.map("name", () => "function result");

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe("function result");
  });

  test("should map string to object", () => {

    let obj = { someProperty: "some value" };
    mapper.map("name", obj);

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe(obj);
  });

  describe("The mapper functions", () => {

    let functionMapper = new Mapper();
    let functionSourceObj = {
      id: 10,
      firstName: "FN",
      lastName: "LN"
    };

    beforeEach(() => {
      functionMapper = new Mapper();
    });

    test("access new property from already mapped value", () => {

      let obj = {
        fullName: "10 - FN LN",
        id: 10,
        fn: "FN",
        ln: "LN"
      };
      mapper
        .map("id")
        .map("fn", "firstName")
        .map("ln", "lastName")
        .map("fullName", (i, n) => `${i.id} - ${n.fn} ${n.ln}`);

      let result = mapper.convert(functionSourceObj);

      expect(result).toEqual(obj);
    });

  });
});