const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const UserModel = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if (await UserModel.findOne({ email })) {
    return res
      .status(400)
      .json({ error: true, message: "user already exists" });
  }

  const user = await UserModel.create(req.body);

  user.password = undefined;

  return res.json({
    error: false,
    message: "Registred with sucess!",
    data: user,
  });
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User not found",
    });
  }

  console.log(user);

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({
      error: true,
      message: "Password doesnt match",
    });
  }

  user.password = undefined;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    authConfig.secret,
    {
      expiresIn: 24 * 60 * 60, //86400seg or 1 day
    }
  );

  return res.json({ user, token });
});

module.exports = router;
