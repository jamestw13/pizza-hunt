const {Pizza} = require('../models');

const pizzaController = {
  // GET /api/pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET /api/pizzas/:id
  getPizzaById({params}, res) {
    Pizza.findOne({_id: params.id})
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({message: 'No pizza found with this id!'});
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST /api/pizzas
  createPizza({body}, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  // PUT /api/pizzas/:id
  updatePizza({params, body}, res) {
    Pizza.findOneAndUpdate({_id: params.id}, body, {new: true})
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({message: 'No pizza found with this id'});
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE /api/pizzas/:id
  deletePizza({params}, res) {
    Pizza.findOneAndDelete({_id: params.id})
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({message: 'No pizza found with this id'});
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
};

module.exports = pizzaController;
