const Address = require('../models/Address')
const {
    showError,
    showSuccess
} = require('./MessageController')

const AddressController = {
    async addAddress(req, res, next) {
        try {
            const address = req.address
            Address.creare(address)
                .then(u => {
                    req.address = u
                    next()
                })
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async updateAddress(req, res) {
        try {
            const idAddress = req.params.id
            const address = req.address
            Address.findByIdAndUpdate(idAddress, {...address})
                .then(() => showSuccess(res, 1006))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async removeAddress(req, res, next) {
        try {
            const idAddress = req.params.id
            Address.findByIdAndRemove(idAddress)
                .then(() => next())
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    } 
}

module.exports = AddressController