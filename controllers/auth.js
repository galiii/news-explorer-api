const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error"); // 400
const ConflictError = require("../errors/conflict-error"); // 409

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "not-so-secret-string",
        { expiresIn: "7d" },
      );
      res.send({ token });
    })
    .catch(next);
};

// signup
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((userData) => {
      res.status(201).send({
        data: {
          _id: userData._id,
          email: userData.email,
          name: userData.name,
        },
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "SyntaxError") {
        throw new BadRequestError("Invalid data passed to the method create User");
      } else if (err.name === "MongoServerError") {
        throw new ConflictError("E11000 An email was specified that already exists on the server.");
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};