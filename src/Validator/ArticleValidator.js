const { body, query, param } = require("express-validator");



class articleValidator {
  static article() {
    return [
      param("userId").exists(),
      body("title", "title is required").isString(),
      body("description", "description is required").isString(),
    ];
  }
 
}

module.exports = articleValidator;
