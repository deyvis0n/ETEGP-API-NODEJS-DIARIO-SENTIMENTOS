const mongoose = require('mongoose')

const User = mongoose.model(
    'MensagePost',
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        userMessage: {
            type: String,
            require: true
        },
        createOn: {
            type: Date,
            require: true,
        }
    })
)

module.exports = User