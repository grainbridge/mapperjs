"use strict";

const Mapper = require("../src/mapper");

describe("The mapper", ()=>{
  let mapper = new Mapper();
  let sourceObj = {
    name : "test"
  };
  
  beforeEach(()=> {
    mapper = new Mapper(); 
  });

  test("should map string to property to same property on destination", ()=> {
    mapper.map("name");

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe("test");
        
  });

  test("should map string to function", ()=> {
    mapper.map("name", ()=> "function result");

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe("function result");
  });

  test("should map string to object", ()=> {

    let obj = {someProperty: "some value"};
    mapper.map("name", obj );

    let result = mapper.convert(sourceObj);

    expect(result.name).toBe(obj);
  });
});