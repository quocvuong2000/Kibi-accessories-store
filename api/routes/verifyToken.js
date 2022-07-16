const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.VUONG_SEC_PASS, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        req.user.type === "customer" ||
        req.user.type === "admin" ||
        req.user.type === "staff"
      ) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndStaff = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.type === "staff" || req.user.type === "admin") {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndProductStaff = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        (req.user.type === "staff" && req.user.role === "product") ||
        req.user.type === "admin"
      ) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndBlogStaff = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        (req.user.type === "staff" && req.user.role === "blog") ||
        req.user.type === "admin"
      ) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndOrderStaff = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        (req.user.type === "staff" && req.user.role === "order") ||
        req.user.type === "admin"
      ) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
  }
};
const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.type === "admin") {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  } catch (error) {
    res.status(504).json(error);
    s;
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndStaff,
  verifyTokenAndProductStaff,
  verifyTokenAndBlogStaff,
  verifyTokenAndOrderStaff,
  verifyTokenAndAdmin,
};
