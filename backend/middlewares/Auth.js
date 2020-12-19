const jwt = require('jsonwebtoken')
const { showError } = require('../controllers/MessageController')

const Auth = {
    async isLogged(req, res, next) {
        try {
            const bearerToken = req.header('authorization')
            if (!bearerToken)
                return showError(res, 1017)

            if (typeof bearerToken !== 'undefined') {
                const bearer = bearerToken.split(' ')
                const token = bearer[1]
                const decoded = jwt.verify(token, process.env.KEY)
                req.user = decoded
                next()
            } else {
                return showError(res, 1016)
            }

        } catch (error) {
            showError(res, error.message)
        }
    },
    async isNotLogged(req, res, next) {
        try {
            const bearerToken = req.header('authorization')
            if (!bearerToken)
                return next()

            if (typeof bearerToken !== 'undefined') {
                const bearer = bearerToken.split(' ')
                const token = bearer[1]
                const decoded = jwt.verify(token, process.env.KEY)
                req.user = decoded
                return showError(res, 1015)
            } else {
                next()
            }

        } catch (error) {
            showError(res, error.message)
        }
    },
    isVendor(req, res, next) {
        if (req.user.role === 'vendor' || req.user.role === 'admin') {
            next()
        } else {
            return showError(res, 1030)
        }
    },
    isAdmin(req, res, next) {
        if (req.user.role === 'admin') {
            next()
        } else {
            return showError(res, 1030)
        }
    },
}

module.exports = Auth