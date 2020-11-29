const table_users = process.env.DYNDB_USERS

const bcrypt = require('bcryptjs')

const User = require('../models/user')
const dynamoStore = require('./dynamoStore')

const saltRounds = 10

async function init() {
  console.log('*****data.users.init')
  create('ryan', 'pass')
  create('jim', 'pass')
  create('kathy', 'pass')
}

async function create (username, passwordString) {
  console.log('*****data.users.create', username, passwordString)
  const passwordHash = hashPassword(passwordString)
  const user = new User(username, passwordHash)
  return await dynamoStore.putItem(table_users, user)
}

async function get (username) {
  console.log('*****data.users.get', username)
  return await dynamoStore.getItem(table_users, 'username', username)
}

async function authenticate (username, passwordString) {
  console.log('*****data.users.authenticate', username, passwordString)
  const user = await get(username)

  if (!user) throw new Error('User not found')

  const valid = validatePassword(passwordString, user.passwordHash)

  return valid ? user : null
}

function validatePassword (passwordString, passwordHash) {
  console.log('*****data.users.validatePassword', passwordString, passwordHash)
  return bcrypt.compareSync(passwordString, passwordHash)
}

function hashPassword (passwordString) {
  console.log('*****data.users.hashPassword', passwordString)
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(passwordString, salt)
  return hash
}

module.exports = {
  authenticate,
  create,
  get,
  init
}
