const controller = require('../controllers/auth.controller')
const { verifySignUp } = require('../middleware/index')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accep'
        )

        next()
    })

    app.post(
        '/api/auth/signup',
        [
            verifySignUp.checkDuplicateUsername,
            verifySignUp.checkDuplicateEmail
        ],
        controller.signup
    )

    app.post('/api/auth/signin', controller.signin)
}