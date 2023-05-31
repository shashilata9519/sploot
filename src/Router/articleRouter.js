const { Router } = require("express");

const GlobalMiddleWare = require("../Middleware/globalMiddleware");
const ArticleController = require("../Controller/articleController");
const articleValidator = require("../Validator/ArticleValidator");

class ArticleRouter{
    router=Router()
    constructor(){
        this.getRouter()
       this.postRouter()
    }
    getRouter(){
        this.router.get('/',GlobalMiddleWare.authenticate,GlobalMiddleWare.checkError,ArticleController.getAllArticle)
    }
    postRouter(){
        this.router.post('/:userId/create',GlobalMiddleWare.authenticate,articleValidator.article(),GlobalMiddleWare.checkError,ArticleController.createArticle)
    }


}

module.exports=new ArticleRouter().router