const User = require("../models/user");
const NotFoundError = require("../errors/not-found-error"); // 404
const { statusListCode, errorListMessage } = require("../utils/constants");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(statusListCode.OK).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(errorListMessage.userNotFound);
    })
    .then((userData) => res.status(statusListCode.OK).send({ data: userData }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
};