const { body } = require("express-validator");

const User = require("../Model/User");

class userValidator {
  static register() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              throw new Error("user already exist");
            } else {
              return true;
            }
          });
        }),
      body("password", "Password is required").isAlphanumeric(),
      body("name", "name is required").isString(),
      body("age", "age is required").isNumeric(),
    ];
  }
  static login() {
    return [
      body("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User Does Not Exist");
            }
          });
        }),
      body("password", "password is required").isAlphanumeric(),
    ];
  }
}

module.exports = userValidator;
