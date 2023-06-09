const { validationResult } = require("express-validator");
const Jwt = require("jsonwebtoken");

class GlobalMiddleWare {
  static checkError(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      next(new Error(error.array()[0].msg));
    } else {
      next();
    }
  }
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader : null;
    try {
      Jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          next(err);
        } else if (!decoded) {
          req.errorStatus = 401;
          next(new Error("User Not Authorised"));
        } else {
          req.user = decoded;
          next();
        }
      });
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }

  static async preventToupdate(req, res, next) {
    try {
      if (req.body.email) next(new Error("Email update is not allowed"));
      if (req.body.password) next(new Error("Password update is not allowed"));
      next();
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }
}

module.exports = GlobalMiddleWare;
