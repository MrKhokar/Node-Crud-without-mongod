const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const posts = require("./route/posts");
const loading = require("./middleware/middlware");

//Middlewares
const app = express();
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("DEV mode");
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loading);
app.use(express.static("Public"));
app.use("/posts", posts);

//Configuaration
console.log(`App Name: ${config.get("name")}`);
console.log(`App mail :${config.get("mail.host")}`);
console.log(`App Password:${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
