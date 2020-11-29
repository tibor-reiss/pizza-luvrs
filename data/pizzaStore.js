const Sequelize = require('sequelize')

const database = process.env.PIZZA_DB
const host = process.env.PIZZA_HOST
const username = process.env.PIZZA_USER
const password = process.env.PIZZA_PASS

const pgClient = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    dialect: 'postgres'
  }
)

const Pizza = pgClient.define('pizza', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  toppings: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.BIGINT
  }
})

Pizza.initialize = async () => {
  console.log('*****data.pizzaStore.initialize')
  //return Pizza.sync({ force: true }).then(() => {
  return Pizza.sync().then(() => {
    console.log('postgres connection ready')
  }).catch(err => console.error(err))
}

module.exports = Pizza
