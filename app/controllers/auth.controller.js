var jwt = require("jsonwebtoken");

var User = require("../models/auth.model.js");

/// login controller ///

exports.login = function (req, res) {
  // Create and Save a new User
  if (!req.body.username) {
    res.status(400).send({ message: "username can not be empty" });
  }

  if (!req.body.password) {
    res.status(400).send({ message: "password can not be empty" });
  }

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { username: user.username, password: user.password },
    function (err, data) {
      if (err) {
        res.status(500).send({
          message: "Could not retrieve this user ",
        });
      } else {
        // check data not null
        console.log("data", data);
        if (data) {
          var token = jwt.sign(
            { username: data.username },
            "qwertyuiopasdfghjklzxcvbnm123456"
          );
          res.send({ token: token });
        } else {
          res.status(500).send({
            message: "Could not find this user ",
          });
        }
      }
    }
  );
};

////register controller ///
exports.register = function (req, res) {
  // Create and Save a new User
  if (!req.body.username) {
    res.status(400).send({ message: "username can not be empty" });
  }

  if (!req.body.email) {
    res.status(400).send({ message: "email can not be empty" });
  }

  if (!req.body.password) {
    res.status(400).send({ message: "password can not be empty" });
  }

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the USer." });
    } else {
      res.send(data);
    }
  });
};
