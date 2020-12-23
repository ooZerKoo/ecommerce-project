const Product = require('../models/Product')
const Category = require('../models/Category')
const { showError, showSuccess } = require('../controllers/MessageController')
const { getLimit, getSkip } = require('../middlewares/pagination')
const fs = require('fs')

const ProductController = {
    async getAllProducts(req, res) {
        try {
            const limit = getLimit(req)
            const skip = getSkip(req)
            Product.find()
                .limit(limit)
                .skip(skip)
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getAllProductsNoLimit(req, res) {
        try {
            Product.find()
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getProductsByCategoryId(req, res) {
        try {
            const id = req.params.id
            const limit = getLimit(req)
            const skip = getSkip(req)

            Category.findById(id)
                .then(cat => Product.find({category: cat._id}).limit(limit).skip(skip))
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async searchProducts(req, res) {
        try {
            const search = req.body.search
            const limit = getLimit(req)
            const skip = getSkip(req)

            Product.find({name: {$regex: search, $options: 'i'}})
                .limit(limit)
                .skip(skip)
                .then(result => showSuccess(res, result))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getTotalProducts(req, res) {
        try {
            Product.count()
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getTotalProductsByCategoryId(req, res) {
        try {
            const id = req.params.id
            Category.findById(id)
                .then(cat => Product.count({category: cat._id}))
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getProductById(req, res) {
        try {
            const id = req.params.id
            Product.findById(id)
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getProductByUrl(req, res) {
        try {
            const url = req.params.url
            Product.findOne({
                    url: url
                })
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async addProduct(req, res) {
        try {
            const {product, history} = req
            await Product.create(product)
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async updateProduct(req, res) {
        try {
            const id = req.params.id
            const {body, history} = req
            await Product.findByIdAndUpdate(id,
                    {...body},
                    {new: true}
                )
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async deleteProduct(req, res) {
        try {
            const id = req.params.id
            const history = req.history
            await Product.findByIdAndDelete(id)
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async uploadImageProduct(req, res) {
        try {
            const id = req.params.id
            const img = req.file.filename
            Product.findByIdAndUpdate(id,
                {
                    $push: {
                        images: img
                    }
                })
                .then(() => showSuccess(res, 2002))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async deleteImageProduct(req, res) {
        try {
            const idProduct = req.params.idProduct
            const img = req.query.img
            Product.findByIdAndUpdate(idProduct,
                {
                    $pull: {
                        images: img
                    }
                })
                .then(() => fs.unlink('./uploads/product/' + img, (error) => {
                    console.log(error)
                    return error ? showError(res, error) : showSuccess(res, 2005)
                }))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    }
}

module.exports = ProductController