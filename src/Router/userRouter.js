const { Router } = require("express");
const {register, login, userUpdate} = require("../Controller/userController");


const userValidator = require("../Validator/UserValidators");
const GlobalMiddleWare = require("../Middleware/globalMiddleware");

class UserRouter{
    router=Router()
    constructor(){
       this.postRouter()
       this.patchRouter()
    }

    postRouter(){
        this.router.post('/signup',userValidator.register(),GlobalMiddleWare.checkError,register)
        this.router.post('/login',userValidator.login(),GlobalMiddleWare.checkError,login)
    }
    patchRouter(){
        this.router.patch('/:userId',GlobalMiddleWare.authenticate,GlobalMiddleWare.preventToupdate,GlobalMiddleWare.checkError,userUpdate)
    }

}

module.exports=new UserRouter().router