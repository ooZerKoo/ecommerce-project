const User = require('../models/User')
const {
    showError
} = require('../controllers/MessageController')
const {
    isEmail
} = require('./ValidateData')

const ValidateUser = {
    async validateUserLogin(req, res, next) {
        try {
            const { user, password } = req.body
            console.log(user, password);
            if (!user) {
                return showError(res, 1004)
            }
            if (user.length < process.env.LOGIN_LEN) {
                return showError(res, 1005)
            }

            if (!password) {
                return showError(res, 1001)
            }

            if (password.length < process.env.PASSWD_LEN) {
                return showError(res, 1009)
            }
            next()

        } catch (error) {
            showError(res, error.message)
        }
    },
    async validateUserRegister(req, res, next) {
        try {
            const {
                user,
                email,
                password,
                password2
            } = req.body

            // check username field
            if (!user)
                return showError(res, 1004)
            if (user.length < process.env.LOGIN_LEN)
                return showError(res, 1005)

            // check password field
            if (!password)
                return showError(res, 1001)
            if (password.length < process.env.PASSWD_LEN)
                return showError(res, 1009)
            if (!password2 || password !== password2)
                return showError(res, 1003)

            // check email field
            if (!email)
                return showError(res, 1006)
            if (!isEmail(email))
                return showError(res, 1013)

            // check user in database
            const checkUser = await User.findOne({
                user: user
            })
            if (checkUser) return showError(res, 1007)

            // check email in database
            const checkEmail = await User.findOne({
                email: email
            })
            if (checkEmail) return showError(res, 1008)

            next()
        } catch (error) {
            showError(res, error.message)
        }
    },
    async validateUserUpdate(req, res, next) {
        try {
            const {
                password,
                password2
            } = req.body

            // check password field
            if (!password)
                return showError(res, 1001)
            if (password.length < process.env.PASSWD_LEN)
                return showError(res, 1009)
            if (!password2 || password !== password2)
                return showError(res, 1003)
            next()
        } catch (error) {
            showError(res, error.message)
        }
    }
}

module.exports = ValidateUser