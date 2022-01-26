const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { NODE_ENV, JWT_SECRET, devEnv } = require("../utils/configuration");
const UnAuthorizedError = require("../errors/unauthorized-error");
const { errorListMessage } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError(errorListMessage.unauthorized);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : devEnv,
    );
  } catch (err) {
    throw new UnAuthorizedError(errorListMessage.unauthorized);
  }
  req.user = payload;
  next();
};