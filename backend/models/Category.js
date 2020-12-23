const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: String,
    description: String,
    idParent: String,
    url: {
        type: String,
        unique: true,
        required: true
    }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category