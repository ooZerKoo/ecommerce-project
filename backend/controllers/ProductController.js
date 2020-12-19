const Product = require('../models/Product')
const Category = require('../models/Category')
const { showError, showSuccess } = require('../controllers/MessageController')
const { getLimit, getSkip } = require('../middlewares/pagination')

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
    async getProductsByCategoryId(req, res) {
        try {
            const id = req.params.id
            const limit = getLimit(req)
            const skip = getSkip(req)

            console.log(limit, skip)

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
    async getTotalProductsByCategoryId(req, res) {
        try {
            const id = req.params.id
            Category.findById(id)
                .then(cat => Product.find({category: cat._id}))
                .then(data => showSuccess(res, data.length))
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
            const {
                product,
                history
            } = req
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
            const {
                product,
                history
            } = req
            await Product.findByIdAndUpdate(id, {
                    ...product
                }, {
                    new: true
                })
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
    }
}

module.exports = ProductController