const User = require("../Model/User");

const Utils = require("../Utills/utills");
const Jwt = require("jsonwebtoken");
class UserController {
  static async register(req, res, next) {
    try {
      const newdata = {
        ...req.body,

        password: await Utils.encryptPassword(req.body.password),
      };

      const user = await new User(newdata).save();
      res.send({
        statusCode: 200,
        data: user,
        message: "register successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    const user = req.user;
    try {
      const token = Jwt.sign(
        { name: user.name, email: user.email, user_id: user._id },
        "secret",
        { expiresIn: "120d" }
      );
      await Utils.comparePassword(req.body.password, user.password);
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      };
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
  static async userUpdate(req, res, next) {
    try {
      const user_id = req.params.userId;
      await User.findByIdAndUpdate({ _id: user_id }, req.body);
      res.send({
        statusCode: 200,
        message: "updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
