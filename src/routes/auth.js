const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !hashedPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },

      process.env.JWT
    );

    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
