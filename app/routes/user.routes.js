const controller = require('../controllers/user.controller')
const { authJwt } = require('../middleware')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accep'
        )

        next()
    })

    app.get('/api/user/all', controller.allAccess)
    app.post(
        '/api/user/postMessage', 
        [ authJwt.verifyToken ],
        controller.userPost
        )
    app.get('/api/user/getUserPost',
        [ authJwt.verifyToken ],
        controller.userGetPost
    )
}