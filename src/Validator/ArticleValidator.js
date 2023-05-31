const { body, query, param } = require("express-validator");



class articleValidator {
  static article() {
    return [
      param("userId").exists(),
      body("title", "title is required").isAlphanumeric(),
      body("description", "description is required").isAlphanumeric(),
    ];
  }
 
}

module.exports = articleValidator;
