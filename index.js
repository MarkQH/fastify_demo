const path = require('path');

module.exports = async function(fastify, opts) {
  fastify
    .register(require('point-of-view'), {
      engine: 'pug',
      defaultContext: {
        dev: process.env.NODE_ENV == 'development'
      },
      includeViewExtension: true
    })
    .register(require('./server'))
}


