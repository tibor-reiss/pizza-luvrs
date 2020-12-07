const { filter, orderBy, values } = require('lodash')

const Pizza = require('../models/pizza')
const ImageStore = require('../lib/imageStore')
const PizzaStore = require('./pizzaStore')

async function init () {
  await PizzaStore.initialize()
}

async function create (name, toppings, img, username) {
  console.log('*****data.pizzas.create', name, toppings, img, username)
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img)
  const pizza = new Pizza(name, toppings, imgUrl, username)
  return PizzaStore.create(prepPizza(pizza))
}

// for mocks that don't need pizza images saved
async function batchImport(name, toppings, imgUrl, username) {
  id = name.replace(/ /g, '-')
  const pizza = await get(id)
  if(pizza == null) {
    const pizza = new Pizza(name, toppings, imgUrl, username)
    PizzaStore.create(prepPizza(pizza))
  }
}

async function getForUser(username) {
  console.log('*****data.pizzas.getForUser', username)
  return PizzaStore.findAll({
    where: {
      username: username
    },
    raw: true
  }).then(debriefPizzas)
}

async function getRecent() {
  console.log('*****data.pizzas.getRecent')
  return PizzaStore.findAll({
    order: [['created', 'DESC']],
    limit: 4,
    raw: true
  }).then(debriefPizzas)
}

async function get(pizzaId) {
  console.log('*****data.pizzas.get', pizzaId)
  return PizzaStore.findOne({
    where: {
      id: pizzaId
    },
    raw: true
  }).then(debriefPizza)
}

function prepPizza(pizza) {
  console.log('*****data.pizzas.prepPizza', pizza)
  return {
    ...pizza,
    toppings: JSON.stringify(pizza.toppings)
  }
}

function debriefPizza(pizza) {
  console.log('*****data.pizzas.debriefPizza', pizza.id)
  if(pizza==null){
    return null
  } else {
    return {
      ...pizza,
      toppings: JSON.parse(pizza.toppings)
    }
  }
}

function debriefPizzas(pizzas) {
  console.log('*****data.pizzas.debriefPizzas')
  return pizzas.map(debriefPizza)
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent,
  init
}
