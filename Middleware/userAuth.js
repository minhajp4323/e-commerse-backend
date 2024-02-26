const jwt = require("jsonwebtoken");

module.exports = function verifyAdminToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.json({ error: "No token provided" });
  }
  jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.email = decoded.email;
    next();
  });
};
