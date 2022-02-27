const authRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { createUser, login } = require("../controllers/auth");

authRouter.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      username: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

authRouter.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = authRouter;