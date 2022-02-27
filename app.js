const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./middlewares/limiter");
const NotFoundError = require("./errors/not-found-error");
const routes = require("./routes/index");
const { statusListCode, errorListMessage } = require("./utils/constants");
const {
  localDB,
  DBA,
  NODE_ENV,
  PORT,
} = require("./utils/configuration");
console.log(NODE_ENV)
const app = express();
app.use(limiter); // applying the rate-limiter

// connect to the MongoDB server "mongodb://0.0.0.0:27017
mongoose.connect(NODE_ENV === "production" ? DBA : localDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//


app.use(helmet());
app.use(bodyParser.json()); // parses data in JSON format only
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors()); // enable requests for all routes
app.use(requestLogger); // enabling the request logger
app.use("/", routes);

app.use("*", (req, res) => {
  throw new NotFoundError(errorListMessage.requestNotFound);
});

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // if an error has no status, give it status 500
  res.status(statusCode).send({
    message:
      statusCode === statusListCode.ServerError
        ? errorListMessage.server
        : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});