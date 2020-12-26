const User = require('../models/User')
const {
    showError
} = require('../controllers/MessageController')

const ValidateAddress = {
    async ValidateAddressData(req, res, next) {
        try {
            const { address, postalCode, phone, poblation, state, name } = req.body
        
            if (!address) {
                return showError(res, 4001)
            }
            if (!postalCode) {
                return showError(res, 4002)
            }
            if (!phone) {
                return showError(res, 4003)
            }
            if (!poblation) {
                return showError(res, 4004)
            }
            if (!state) {
                return showError(res, 4005)
            }
            if (!name) {
                return showError(res, 4006)
            }
            req.address = { address, postalCode, phone, poblation, state, name }
            next()

        } catch (error) {
            showError(res, error.message)
        }
    }
}

module.exports = ValidateAddress