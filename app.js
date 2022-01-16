const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { limiter } = require("./middleware/limiter");

const routes = require("./routes/index");
const NotFoundError = require("./errors/not-found-error");

dotenv.config();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/newsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);

app.use("/", routes);

app.get("*", (req, res) => {
  throw new NotFoundError("Requested resource cannot be found");
});

app.use(limiter);

app.use(errorLogger);
app.use(errors());

// central error middleware
app.use((err, req, res, next) => {
  // console.log(err);
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});