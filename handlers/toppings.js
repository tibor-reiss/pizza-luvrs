const toppingStore = require('../data/toppings')

module.exports = () => {
  console.log('*****handlers.toppings')
  const toppings = toppingStore.getAll()
  return toppings
}
