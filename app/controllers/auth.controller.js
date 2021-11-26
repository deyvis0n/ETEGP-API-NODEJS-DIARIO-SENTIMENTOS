const db = require('../models')
const User = db.user
const SECRET = process.env.SECRET

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user.save((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        res.status(201).send({ message: "Usuario cadastrado com sucesso!"})
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (!user) {
            return res.status(404).send({ message: 'Usuario não encontrado '})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: 'Senha Invalida!'
            })
        }

        var token = jwt.sign({ id: user.id }, SECRET, {
            expiresIn: 1800 // token expira em 30 minutos
        })

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        })
    })
}