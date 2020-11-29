const pizzas = require('./pizzas')
const users = require('./users')
const toppings = require('./toppings')
const {s3_bucket} = require('../lib/imageStoreS3')

const mockPizzas = [
  require('./mock_pizzas/best_pizza.json'),
  require('./mock_pizzas/filthy_rich.json'),
  require('./mock_pizzas/foul_wizard.json'),
  require('./mock_pizzas/lazer_pie.json'),
  require('./mock_pizzas/meat_haters.json'),
  require('./mock_pizzas/red_forever.json')
]

module.exports.hydrate = async () => {
  console.log('*****data.mock.hydrate')
  // prep users
  await users.init()

  // prep toppings
  await toppings.init()

  // prep pizzas
  await pizzas.init()
  for (const pizza of mockPizzas) {
    img = s3_bucket + pizza.img
    await pizzas.batchImport(pizza.name, pizza.toppings, img, pizza.username)
  }
}
