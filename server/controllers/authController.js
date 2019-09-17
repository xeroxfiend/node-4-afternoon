const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const {username, password} = req.body;
    if (username === users.username && password === users.password) {
      req.session.user.username = username;
      res.status(200).send(req.session.user);
    } else {
      res.state(500).send(alert("User not found"));
    }
  },

  register: (req, res, next) => {
    const {username, password} = req.body
    let newId = id
    const newUser = {
        username,
        password,
        id: newId
    }
    id++
    users.push(newUser)
    req.session.user.username = username
    res.send(200).send(req.session.user)
  },

  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: (req, res, next) => {
    res.status(200).send(req.session.user)
  }
};
