'use strict'

const path = require('path')
const fastify = require('fastify')()
const AutoLoad = require('fastify-autoload')

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
})

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'services'),
})

fastify.register(require('point-of-view'), {
  engine: {
    pug: require('pug')
  },
  defaultContext: {
    dev: process.env.NODE_ENV === 'development'
  },
  includeViewExtension: true
})

const launch = async () => {
  try {
    await fastify.listen(3000, (err , address) => {
      process.send('ready')
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.info('SIGINT signal received.') // pm2 stop 的时候会发出
  fastify.close(function(err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    // 关闭所有资源的连接
  })
})

launch()
