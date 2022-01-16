const articlesRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middleware/auth");

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

articlesRouter.get("/", auth, getArticles);

articlesRouter.post(
  "/",
  auth,
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().uri().required(),
      image: Joi.string().uri().required(),
    }),
  }),
  createArticle,
);

articlesRouter.delete(
  "/:articleId",
  auth,
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().required().hex(),
    }),
  }),
  deleteArticle,
);

module.exports = articlesRouter;