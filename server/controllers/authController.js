const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const {username, password} = req.body;

    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
      req.session.user.username = username;
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send("User not found");
    }
  },

  register: (req, res, next) => {
    const {username, password} = req.body
    const newUser = {
        username,
        password,
        id
    }
    id++
    users.push(newUser)
    req.session.user.username = username
    res.status(200).send(req.session.user)
  },

  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: (req, res, next) => {
    res.status(200).send(req.session.user)
  }
};
