'use strict'

module.exports = function (fastify, opts, done) {
  fastify.get('/', function (request, reply) {
    reply.send('');
  })
  done()
}
