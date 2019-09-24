'use strict'
const sha1 = require('sha1')
const config = require('../config')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.addHook('onRequest', function(request, reply, next) {
    const { signature, echostr, timestamp, nonce } = request.query
    const { token } = config
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    console.log(request.raw.method)
    if (sha1Str === signature) {
      reply.send(echostr)
    } else {
      reply.send('error')
    }
    next()
  })
  done()
})
