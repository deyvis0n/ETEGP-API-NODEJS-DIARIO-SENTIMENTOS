const jwt = require('jsonwebtoken')
SECRET = process.env.SECRET
const db = require('../models')

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({ message: 'Token não fornecido!' })
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Não autorizado'})
        }
        req.userId = decoded.id
        next()
    })
}

const authJwt = {
    verifyToken
}

module.exports = authJwt