module.exports = async function(fastify, opts, done) {
  fastify
    .register(require('./home'))
    .done();
}