'use strict'
const sha1 = require('sha1')
const config = require('../config')
const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', (request, reply, next) => {
    console.log('==============')
    const { signature, echostr, timestamp, nonce } = request.query
    const { token } = config
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    if (sha1Str === signature) {
      reply.send(echostr)
    } else {
      reply.send('error')
    }
    next()
  })
  return
})
