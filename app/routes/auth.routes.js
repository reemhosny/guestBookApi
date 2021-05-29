module.exports = function (app) {
  var auth = require("../controllers/auth.controller");
  // Login
  app.post("/login", auth.login);
  // Register
  app.post("/register", auth.register);
};
