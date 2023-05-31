const Article = require("../Model/Article");

class ArticleController {
  static async createArticle(req, res, next) {
    const user_id = req.params.userId;
    try {
      const article = await new Article({ ...req.body, user_id }).save();
      res.send({
        statusCode: 200,
        data: article,
        message: "Article created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllArticle(req, res, next) {
    try {
      const getAllarticles = await Article.find().populate(
        "user_id",
        "email name age"
      );
      res.send({
        statusCode: 200,
        data: getAllarticles,
        message: "fetched  successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ArticleController;
