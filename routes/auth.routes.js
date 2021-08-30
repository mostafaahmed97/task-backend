const express = require("express");
const router = express.Router();
const { models } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Fields are required" });

    let user = await models.user.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(403).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Error" });
  }
});

module.exports = router;
