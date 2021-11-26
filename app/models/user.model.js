const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true
        }
    })
)

module.exports = User