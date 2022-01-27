const Article = require("../models/article");
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404
const ForbiddenError = require("../errors/forbidden-error"); // 403
const { statusListCode, errorListMessage } = require("../utils/constants");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(statusListCode.OK).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  Article.create({
    keyword: req.body.keyword,
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    source: req.body.source,
    link: req.body.link,
    image: req.body.image,
    owner,
  })
    .then((articleData) => res.status(201).send({ data: articleData }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "SyntaxError") {
        throw new BadRequestError(errorListMessage.articleBadRequest);
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError(errorListMessage.articleNotFound);
    })
    .then((article) => {
      // console.log("delete article in line 44", article);
      if (req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then(() => res.status(statusListCode.OK).send({ article }));
      } else {
        // req.user.toString() !== cardData.owner.toString()
        throw new ForbiddenError(errorListMessage.articleForbidden);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};