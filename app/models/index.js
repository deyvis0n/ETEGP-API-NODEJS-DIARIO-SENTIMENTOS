const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.user = require('./user.model')
db.userPost = require('./userPost.model')

module.exports = db