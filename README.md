# mapper
A simple javascript object mapper library to map one js object to another. 

## Usage
### Simple mapping of same property names
```javascript
    const mapper = new Mapper();
    mapper.map("name");
    let mappedObject = mapper.convert(sourceObj);
```

### Mapping to an object
```javascript
    const mapper = new Mapper();
    mapper.map("name", {someProperty: "some value"});
    let mappedObject = mapper.convert(sourceObj);
```

### Mapping to a function
```javascript
    const mapper = new Mapper();
    mapper.map("name", ()=> "function result");
    let mappedObject = mapper.convert(sourceObj);
```

### Complex and nested mappings
```javascript
const mapper = new Mapper()
  .map([
    "id",
    "name",
    "timeZone",
    "officeEmail",
    "primaryAddress",
    "secondaryAddress",
    "facilityTypes",
    "urlPath"
  ])
  .map("coordinates", {
    key: "coordinates",
    mapper: new Mapper().map(["latitude", "longitude"])
  });

  let mappedObject = mapper.convert(sourceObj);
```
