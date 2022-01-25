const DBA = "mongodb://localhost:27017/newsdb"; // dataBase Address
const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const devEnv = "not-very-secret-key";

module.exports = {
  DBA,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  devEnv,
};