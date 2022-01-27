const localDB = "mongodb://localhost:27017/newsdb"; // local database
const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DBA,
} = process.env;
const devEnv = "not-very-secret-key";

module.exports = {
  localDB,
  DBA,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  devEnv,
};