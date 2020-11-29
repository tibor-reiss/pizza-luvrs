const pizzaStore = require('../data/pizzas')

module.exports = async (req, h) => {
  console.log('*****handlers.main')
  const pizzas = await pizzaStore.getRecent()
  const context = {
    auth: req.auth,
    pizzas: pizzas
  }

  return h.view('index', context)
}
