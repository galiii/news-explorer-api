const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
const UnAuthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Authorization required line 8");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "not-very-secret-key");
    // console.log("payload",payload);
  } catch (err) {
    throw new UnAuthorizedError("Authorization required line 18");
  }
  req.user = payload;
  // console.log("REQ USER", req.user);
  next();
};