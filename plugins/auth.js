'use strict'
const path = require('path')
const sha1 = require('sha1')
const fp = require('fastify-plugin')
const config = require('../config')

module.exports = (function (fastify, opts, done) {
  // 验证消息是否来自于微信服务器
  fastify.addHook('onRequest', (request, reply, next) => {
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
  done()
})