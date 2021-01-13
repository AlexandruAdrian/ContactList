const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.SECRET;

const isAuthorized = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (typeof authHeader === "string") {
    let token = authHeader;
    if (!token) {
      return res.sendStatus(401);
    }

    token = token.substr("Bearer ".length);
    let decoded = jwt.decode(token);
    if (!decoded) {
      return res.sendStatus(401);
    }

    jwt.verify(token, PRIVATE_KEY, (err, decodedToken) => {
      if (err) {
        return res.sendStatus(401);
      }

      Object.defineProperty(req, "user", {
        value: {
          _id: decodedToken._id,
        },
      });
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = isAuthorized;
