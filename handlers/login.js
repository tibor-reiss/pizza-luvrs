const Boom = require('@hapi/boom')

const users = require('../data/users')
const querystring = require('querystring')

module.exports = async (req, h) => {
  console.log('*****handlers.login')
  if (req.auth.isAuthenticated) {
    return h.redirect('/')
  }

  if (req.method === 'post') {
    const user = await users.authenticate(req.payload.username.toLowerCase(), req.payload.password)
    if (!user) return Boom.unauthorized()
    const sid = String(Math.random())
    await req.server.app.cache.set(sid, user, 0)
    req.cookieAuth.set({ sid: sid, user: user })
    return h.redirect(getNext(req.headers.referer) || '/')
  } else if (req.method === 'get') {
    return h.view('login')
  }
}

function getNext (referer) {
  let next = ''
  if (referer) {
    let refererSplit = referer.split('?')
    if (refererSplit[1]) {
      next = querystring.parse(refererSplit[1]).next
    }
  }
  return next
}
