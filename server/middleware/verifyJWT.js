const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  if (
    req.url.includes("/api/login") ||
    req.url == "/api/user" ||
    req.url.includes("/api/forgotpassword") ||
    req.url.includes("/api/register") ||
    req.url.includes("/api/activate") ||
    req.url.includes("/api/resetpassword") ||
    req.url.includes("/api/password/reset") ||
    req.url.includes("/api/sendconfirm/") ||
    req.url.includes("/api/created/profile") ||
    req.url.startsWith("/api/image") // เพิ่มเงื่อนไขนี้
    ||req.url.startsWith("/api/public/avatar") // เพิ่มเงื่อนไขนี้
    ||req.url.startsWith("/public/avatar") // เพิ่มเงื่อนไขนี้
    || req.url.includes("/api/enum/gender")
  ) {
    next();
  } else {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded;
      next();
    });
  }
};

module.exports = verifyJWT;
