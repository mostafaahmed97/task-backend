const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (!req.get("Authorization"))
    return res.status(401).json({ error: "Invalid token supplied" });

  try {
    const decoded = jwt.verify(req.get("Authorization"), process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token supplied" });
  }
};

module.exports = auth;
