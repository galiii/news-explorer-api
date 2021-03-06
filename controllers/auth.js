const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error"); // 400
const ConflictError = require("../errors/conflict-error"); // 409
const { statusListCode, errorListMessage } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET, devEnv } = require("../utils/configuration");

const createUser = (req, res, next) => {
  const { email, password, username } = req.body;
  console.log("in auth line 15",email,password,username);
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, username, password: hash }))
    .then((userData) => {
      console.log("user data line 19",userData)
      res.status(statusListCode.Created).send({
        data: {
          _id: userData._id,
          email: userData.email,
          username: userData.username,
        },
      });
    })
    .catch((err) => {
      // console.log("error code line 28", err.code);
      if (err.name === "ValidationError" || err.name === "SyntaxError") {
        throw new BadRequestError(errorListMessage.signupBadRequest);
      } else if (err.code === 11000) {
        throw new ConflictError(errorListMessage.signupConflict);
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log("req in login", req.body);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log("req in login", req.body);
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : devEnv,
        { expiresIn: "7d" },
      );
      res.status(statusListCode.OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};