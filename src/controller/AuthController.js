const express = require("express");

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

module.exports = router;
