const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
      const decoded = jwt.verify(token.split(" ")[1], "secretkey");
      if (role && decoded.role !== role)
        return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }
  };
};

module.exports = auth;
