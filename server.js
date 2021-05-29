var jwt = require("jsonwebtoken");

var express = require("express");

var bodyParser = require("body-parser");

// create express app
var app = express();

var router = express.Router();

// allow cross origin
app.use(function (req, res, next) {
  // shoud be changed to specsific ip server ///
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, jwt"
  );
  next();
});

/// midleware to check jwt // matching
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.jwt;
  console.log("jwt", authHeader);

  if (authHeader) {
    jwt.verify(authHeader, "qwertyuiopasdfghjklzxcvbnm123456", (err, user) => {
      if (err) {
        console.log("error", err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use(authenticateJWT);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require("./config/database.config.js");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useMongoClient: true,
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// define a simple route
app.get("/", function (req, res) {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/location.routes.js")(app);

// listen for requests
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
