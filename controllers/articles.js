const Article = require("../models/article"); // this file is the user controller
const BadRequestError = require("../errors/bad-request-error"); // 400
const NotFoundError = require("../errors/not-found-error"); // 404
const ForbiddenError = require("../errors/forbidden-error"); // 403

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((articleData) => res.status(201).send({ data: articleData }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "SyntaxError") {
        throw new BadRequestError("Invalid data passed to the method create Article");
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError("No card found with that id");
    })
    .then((articleData) => {
      if (req.user._id.toString() === articleData.owner.toString()) {
        Article.deleteOne(articleData).then(() => res.status(200).send({ data: articleData }));
      } else if (req.user._id.toString() !== articleData.owner.toString()) {
        throw new ForbiddenError("This user Isn’t the Owner of this article");
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};