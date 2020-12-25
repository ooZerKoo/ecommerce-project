const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    poblation: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
})

const Address = mongoose.model('Address', AddressSchema)

module.exports = Address