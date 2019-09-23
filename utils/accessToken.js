'use strict'
const { writeFile, readFileSync } = require('fs')
const { appID, appsecret } = require('../config')
const http = require('./http')

class Wechat {

  constructor() {

  }

  async getAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
    try{
      let res = await http.get(url);
      res.expires_in = Date.now() + (res.expires_in - 300) * 1000
      return res
    } catch(err) {
      return err
    }
  }

  async saveAccessToken(accessToken) {
    await writeFile('./accessToken.txt', JSON.stringify(accessToken), err => {
      if (err) {
        console.log(err)
      }
    })
  }

  async readAccessToken() {
    try {
      let data = await readFileSync('./accessToken.txt')
      return JSON.parse(data)
    } catch (err) {
      return {}
    }
  }

  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }
    return data.expires_in > Date.now()
  }

  async fetchAccessToken() {
    if(this.access_token && this.expires_in && this.isValidAccessToken(this)) {
      return { access_token: this.access_token, expires_in: this.expires_in }
    } else {
      const data = await this.readAccessToken()
      if (this.isValidAccessToken(data)) {
        return data
      } else {
        const res = await this.getAccessToken()
        await this.saveAccessToken(res)
        this.access_token = res.access_token
        this.expires_in = res.expires_in
        return res
      }
    }
    
  }
}

const w = new Wechat()
w.fetchAccessToken()