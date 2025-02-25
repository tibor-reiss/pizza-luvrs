const table_toppings = process.env.DYNDB_TOPPINGS

const { sortBy, values } = require('lodash')

const Topping = require('../models/topping')
const dynamoStore = require('./dynamoStore')

async function init () {
  console.log('*****data.toppings.init')
  create('Dough Crust', 'dough.png', 'dough_crust.png', 1)
  create('Marinara Sauce', 'marinara.png', 'marinara_sauce.png', 2)
  create('Mozzarella Cheese', 'mozzarella.png', 'mozzarella_cheese.png', 3)
  create('Cheddar Cheese', 'cheddar.png', 'cheddar_cheese.png', 4)
  create('Mushrooms', 'mushroom.png', 'mushrooms.png', 5)
  create('Pepperoni', 'pepperoni.png', 'pepperonis.png', 6)
  create('Laser Beams', 'laser_beam.png', 'laser_beams.png', 7)
  create('Banana Peppers', 'banana_pepper.png', 'banana_peppers.png', 8)
  create('Ham', 'ham.png', 'hams.png', 9)
  create('Green Peppers', 'green_pepper.png', 'green_peppers.png', 10)
  create('Rainbows', 'rainbow.png', 'rainbows.png', 11)
  create('Money', 'money.png', 'moneys.png', 12)
}

async function getAll () {
  console.log('*****data.toppings.getAll')
  const tops = await dynamoStore.getAllItems(table_toppings)
  return sortBy(tops, ['order'])
}

async function create (name, previewImage, image, order) {
  console.log('*****data.toppings.create', name, previewImage, image, order)
  const id = name.replace(/ /g, '_').toLowerCase()
  const topping = new Topping(id, name, previewImage, image, order)
  return dynamoStore.putItem(table_toppings, topping)
}

module.exports = {
  getAll,
  init
}
