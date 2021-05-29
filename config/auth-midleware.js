var jwt = require("jsonwebtoken");
/// midleware to check jwt // matching
module.exports = function (req, res, next) {
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
