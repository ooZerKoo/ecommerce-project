const User = require('../models/User')
const {
    showError,
    showSuccess
} = require('../controllers/MessageController')

const UserController = {
    async getUserData(req, res) {
        try {
            const user = req.user
            User.findById(user._id)
                .then(u => showSuccess(res, u))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async loginUser(req, res) {
        try {
            const { user, password } = req.body
            const logged = await User.findOne({
                user: user
            })
            if (!logged)
                return showError(res, 1010)

            const checkPassword = await logged.checkPassword(password)
            if (!checkPassword)
                return showError(res, 1011)

            logged.generateAuthToken()
                .then(token => showSuccess(res, token, null, 200, token))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async registerUser(req, res, next) {
        try {
            const { user, password, email } = req.body
            await User.create({
                user,
                password,
                email
            })
            next()
        } catch (error) {
            showError(res, error.message)
        }
    },
    async updateUser(req, res) {
        try {
            const { password } = req.body
            const { id } = req.params
            const history = req.history

            const user = await User.findById(id)
            const role = req.user.role

            if (id !== req.user._id) {
                switch (role) {
                    default:
                    case 'customer':
                        return showError(res, 1030)
                        
                    case 'vendor':
                        if (user.role !== 'customer') {
                            return showError(res, 1030)
                        }
                        break
                    
                    case 'admin':
                        break

                }
            }

            user.updatePassword(password)
                .then(user => showSuccess(res, user, history))
                .catch(e => showError(res, e.message))

        } catch (error) {
            showError(res, error.message)
        }
    },
    async addUserAddress(req, res) {
        try {
            const idUser = req.user._id
            const address = req.address._id
            await User.findByIdAndUpdate(idUser, {
                $push: {
                    address: address
                }
            })
            return showSuccess(res, 1005)
        } catch (error) {
            showError(res, error.message)
        }
    },
    async removeUserAddress(req, res) {
        try {
            const idUser = req.user._id
            const address = req.address._id
            await User.findByIdAndUpdate(idUser, {
                $pull: {
                    address: address
                }
            })
            return showSuccess(res, 1007)
        } catch (error) {
            showError(res, error.message)
        }
    },
}

module.exports = UserController