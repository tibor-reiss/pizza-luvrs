const pizzaStore = require('../data/pizzas')

module.exports = async (req, h) => {
  console.log('*****handlers.main', req.statusCode)
  const pizzas = await pizzaStore.getRecent()
  const context = {
    auth: req.auth,
    pizzas: pizzas,
    sc: req.statusCode
  }
  console.log('*****handlers.main finished!', pizzas.length)

  return h.view('index', context)
}
