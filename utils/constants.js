const statusListCode = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  ServerError: 500,
};

const errorListMessage = {
  // app
  server: "An error occurred on the server",
  requestNotFound: "Requested resource not found",
  // auth
  unauthorized: "Authorization required",
  // signup
  signupBadRequest: "Invalid data passed to the method create User",
  signupConflict: "An email was specified that already exists on the server.",
  // user
  userNotFound: "No user found with that id ",
  userUnauthorized: "Incorrect email or password",
  // article
  articleBadRequest: "Invalid data passed to the method create Article",
  articleNotFound: "No article found with that id",
  articleForbidden: "This user Isn’t the Owner of this article",
};

module.exports = {
  statusListCode,
  errorListMessage,
};