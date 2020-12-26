const Address = require('../models/Address')
const User = require('../models/User')
const {
    showError,
    showSuccess
} = require('./MessageController')

const AddressController = {
    async addAddress(req, res, next) {
        try {
            const address = req.address
            Address.create(address)
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
    },
    async getUserAddresses(req, res) {
        try {
            const idUser = req.user._id
            const data = []
            const user = await User.findById(idUser)
            for (let i in user.address) {
                const address = await Address.findById(user.address[i])
                data.push(address)
            }
            showSuccess(res, data)
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getAddress(req, res) {
        try {
            const idAddress = req.params.idAddress
            Address.findById(idAddress)
                .then(data => showSuccess(res, data))
                .catch(error => showError(res, error.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    
}

module.exports = AddressController