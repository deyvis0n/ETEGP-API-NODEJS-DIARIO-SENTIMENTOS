const db = require('../models')
const User = db.user

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (user) {
            res.status(400).send({ message: 'Falha! nick já em uso!' })
            return
        }

        next()
    })
}

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (user) {
            res.status(400).send({ message: 'Falha! email já cadastrado' })
            return
        }

        next()
    })
}

const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateEmail
}

module.exports = verifySignUp