'use strict'

class homeServer{
  constructor(homeCollection) {
    this.homeCollection = homeCollection;
  }
  async testFun(user, text) {
    await this.tweetCollection.insertOne({
      user,
      text,
      createdAt: new Date()
    })
  }
}

module.exports = homeServer