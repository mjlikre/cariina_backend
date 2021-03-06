const db = require("./../models");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
require("dotenv").config();

const tokenForUser = function (user) {
  return jwt.sign(
    { sub: user },
    process.env.SECRET_KEY
    // { expiresIn: 7200 }
  );
};

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "You must provide an email and password" });
    }
    try {
      // Check if theres existing user
      const existingUser = await db.User.findOne({ email });
      // if user exist, throw error
      if (existingUser) {
        return res.status(422).json({ error: "Email is in use" });
      }
      // else save the user as a new user in the dabatase
      const user = new db.User({ email, password });
      await user.save();
      res.json({ token: tokenForUser(user._id) });
    } catch (error) {
      console.log(error);

      res.status(404).json({ error: error });
    }
  },
  signIn: (req, res) => {
    res.send({ token: tokenForUser(req.user) });
  },
};
