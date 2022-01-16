require("dotenv").config();

const User = require("../models/user");
const NotFoundError = require("../errors/not-found-error"); // 404

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  // console.log("user", req.user._id);
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("No user found with that id ");
    })
    .then((userData) => res.status(200).send({ data: userData }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
};