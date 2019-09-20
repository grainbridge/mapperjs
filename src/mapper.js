
module.exports = class Mapper {
  /**
   * @constructor
   * @param {Mapper} [mapper] an optional Mapper object to extend
   */  
  constructor(mapper) {
    if (!mapper)
      this.rules = {};
    else
      this.rules = Object.assign({}, mapper.rules);
  }
  
  /**
     * A fluent mapping function used to register  each mapping.
     * @param {String|String[]} to 
     * @param {String|function|Object} [from] the target mapping
     * @returns {Mapper} the current Mapper instance
     */
  map(to, from) {
    if (typeof to === "string")
      this.rules[to] = from || to;
    else if (Array.isArray(to))
      to.forEach(t => this.map(t), this);
    return this;
  }
  
  /**
     * Perform the mapping on the specified object.
     * @param {Object} obj the object to be mapped
     * @returns {Object} the fully mapped object 
     */
  convert(obj) {
    let output = {};
    if (obj) {
      Object.keys(this.rules).forEach((to) => {
        let from = this.rules[to];
        if (typeof from === "string") {
          if (obj[from] !== undefined && obj[from] !== null)
            output[to] = obj[from];
        }
        else if (typeof from == "object" && from.mapper instanceof Mapper) {
          if (from.isArray && obj[from.key]) {
            if (Array.isArray(obj[from.key])) {
              let arr = obj[from.key].map(from.mapper.convert, from.mapper);
              if (arr && arr.length)
                output[to] = arr;
            }
          }
          else {
            let res = from.mapper.convert(obj[from.key]);
            if (res && ((Array.isArray(res) && res.length) || (Object.keys(res).length)))
              output[to] = res;
          }
        } else if (typeof from === "function") {
          let val = from(obj);
          if (val !== undefined && val !== null)
            output[to] = val;
        } else if(typeof from === "object") {
          output[to] = from;
        }
      });
    }
    return output;
  }
};
  