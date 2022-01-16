const usersRouter = require("express").Router();
const { getUsers, getUserById } = require("../controllers/users");

const auth = require("../middleware/auth");

usersRouter.get("/", auth, getUsers); // GET /users — returns all users
usersRouter.get("/me", auth, getUserById); // GET /users/me - returns a user

module.exports = usersRouter;