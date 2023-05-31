const bcrypt = require("bcrypt");

class Utils {
  static encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(plainPass, encryptPass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, encryptPass, (err, isSame) => {
        if (err) {
          reject(err);
        } else if (!isSame) {
          reject(new Error("user and password does not match"));
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = Utils;
