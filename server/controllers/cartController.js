const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    const {id} = req.params;

    const index = req.session.user.cart.findIndex(swag => +swag.id === +id);

    if (index === -1) {
      const selectedSwag = swag.find(swag => +swag.id === +id);

      req.session.user.cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }
    res.status(200).send(req.session.user);
  },

  delete: (req, res, next) => {
      const {id} = req.params
      const {user} = req.session
      
      const index = user.cart.findIndex(swag => +swag.id === +id)
      const selectedSwag = swag.find(swag => +swag.id === +id)

      if (index !== -1) {
          user.cart.splice(index, 1)
          user.total -= selectedSwag.price
      }
      res.status(200).send(user)
  },

  checkout: (req, res, next) => {
      const {user} = req.session
      user.cart = []
      user.total = 0

      res.status(200).send(user)
  }
};
