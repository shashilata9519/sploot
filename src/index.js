const Server = require("./Server");
require("dotenv").config();
const app = new Server().app;

app.listen(8080, () => {
  console.log("server is running at 8080 post");
});
