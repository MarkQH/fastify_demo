const { homeObject } = require('./schemas');


module.exports = async function(fastify, opts) {

  fastify.get('/', {schemas: homeObject}, (req, reply) => {
    reply.view('/views/index', {text: 'text'});
  });
  
}