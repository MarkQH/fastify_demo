'use strict'
const sha1 = require('sha1')
const config = require('../config')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.addHook('onRequest', function(request, reply, next) {
    const { signature, echostr, timestamp, nonce } = request.query
    const { token } = config
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    if (request.raw.method === 'GET') {
      if (sha1Str === signature) {
        reply.send(echostr)
      } else {
        reply.send('error')
      }
      next()
    } else if (request.raw.method === 'POST') {
      if (sha1Str !== signature) {
        reply.send('error')
      } else {

      }
      next()
    } else {
      reply.send('error')
    }
  })
  done()
})
