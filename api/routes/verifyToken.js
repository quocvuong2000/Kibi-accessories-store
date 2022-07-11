const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
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
};
const verifyTokenAndAuthorization = (req, res, next) => {
  console.log(req.user);
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
};
const verifyTokenAndStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type === "staff" || req.user.type === "admin") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
const verifyTokenAndProductStaff = (req, res, next) => {
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
};
const verifyTokenAndBlogStaff = (req, res, next) => {
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
};
const verifyTokenAndOrderStaff = (req, res, next) => {
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
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type === "admin") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
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
