'use strict'

const homeObject = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    user: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        username: { type: 'string' }
      }
    },
    text: { type: 'string' }
  }
}

module.exports = {
  homeObject
}