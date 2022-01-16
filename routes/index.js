const router = require("express").Router();

const auth = require("./auth");
const users = require("./users");
const articles = require("./articles");

router.use("/", auth);
router.use("/users", users);
router.use("/articles", articles);

module.exports = router;