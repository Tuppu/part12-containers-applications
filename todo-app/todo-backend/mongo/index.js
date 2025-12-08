const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.error('error connecting to MongoDB:', error.message)
    })
}

module.exports = {
  Todo
}
