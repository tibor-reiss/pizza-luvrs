module.exports = (req, h) => {
  console.log('*****handlers.logout')
  req.cookieAuth.clear()
  return h.redirect('/')
}
