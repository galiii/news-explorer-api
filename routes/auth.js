const authRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { createUser, login } = require("../controllers/auth");

authRouter.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

authRouter.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = authRouter;