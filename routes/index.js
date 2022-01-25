const mainRouter = require("express").Router();
const auth = require("./auth");
const users = require("./users");
const articles = require("./articles");

mainRouter.use("/", auth);
mainRouter.use("/users", users);
mainRouter.use("/articles", articles);

module.exports = mainRouter;