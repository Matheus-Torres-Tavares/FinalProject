const router = require("express").Router();

const User = require("../models/User.js");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const bio = req.body.bio;

  const newUser = new User({ username, bio });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
