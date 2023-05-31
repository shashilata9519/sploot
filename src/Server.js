const express = require("express");
const userRouter = require("./Router/userRouter");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const articleRouter = require("./Router/articleRouter");
const cors=require('cors')

class Server {
  app = express();
  constructor() {
    this.connectToDatabase();
    this.config();
    this.Routers();
    this.error404Handler()
    this.handleErrors()
  }

  Routers() {
    this.app.use("/api/user", userRouter);
    this.app.use("/api/article",articleRouter)
    this.app.use("/api/health",userRouter)
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  async connectToDatabase() {
    try {
      const status = await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      if (status) {
        console.log("database is connected");
      }
    } catch (err) {
      console.log(err);
    }
  }
  handleErrors() {
    this.app.use((error, req, res, next) => {
      let errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message,
        statusCode: errorStatus,
      });
    });
  }
  error404Handler() {
    this.app.use((req, res) => {
        res.status(404).json({
            message: 'Not Found',
            status_code: 404
        });
    })
}
}

module.exports = Server;
