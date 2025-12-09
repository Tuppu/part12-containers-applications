const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
  
  client.on('error', (err) => console.error('Redis error:', err))
  client.on('ready', () => console.log('Redis connected'))
  
  getAsync = (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
  
  setAsync = (key, value) => {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}

module.exports = {
  getAsync,
  setAsync
}