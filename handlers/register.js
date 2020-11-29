module.exports = (req, h) => {
  console.log('*****handlers.register')
  return h.view('register')
}
