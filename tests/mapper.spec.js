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
      functionMapper
        .map("id")
        .map("fn", "firstName")
        .map("ln", "lastName")
        .map("fullName", (i, n) => `${i.id} - ${n.fn} ${n.ln}`);

      let result = functionMapper.convert(functionSourceObj);

      expect(result).toEqual(obj);
    });

  });

  describe("The mapper validation", () => {

    let validationMapper = new Mapper();

    beforeEach(() => {
      validationMapper = new Mapper();
    });

    test("throw exception for when isRequired property is missing", () => {

      let obj = {
        prop1: 10
      };
      validationMapper
        .map("prop1")
        .map("fn", {
          key: "req",
          isRequired: "the property req is required",
          mapper: new Mapper().map(["id", "name"])
        });

      let msg = "";
      try {
        validationMapper.convert(obj);
      }
      catch (e) {
        msg = e.message;
      }

      expect(msg).toEqual("the property req is required");
    });

  });

  describe("Test generateEmpty flag", () => {

    let validationMapper = new Mapper();

    beforeEach(() => {
      validationMapper = new Mapper();
    });

    test("generateEmpty true maps empty array", () => {

      let obj = {
        prop1: []
      };
      validationMapper
        .map("prop1", {
          key: "prop1",
          isArray: true,
          generateEmpty: true,
          mapper: new Mapper().map(["array_prop"])
        });

      let result = validationMapper.convert(obj);
      expect(result).toStrictEqual({prop1: []});
    });

  });
});