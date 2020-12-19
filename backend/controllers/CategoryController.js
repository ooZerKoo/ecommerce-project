const Category = require('../models/Category')
const { getLimit } = require('../middlewares/pagination')
const { showSuccess, showError } = require('./MessageController')

const CategoryController = {
    async getAllCategories(req, res) {
        try {
            const limit = getLimit(req)
            Category.find()
                .limit(limit)
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getCategoryById(req, res) {
        try {
            const { id } = req.params
            Category.findById(id)
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async getCategoryByUrl(req, res) {
        try {
            const { url } = req.params
            Category.findOne({url: url})
                .then(data => showSuccess(res, data))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async addCategory(req, res) {
        try {
            const { category } = req
            const history = req.history
            await Category.create(category)
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async updateCategory(req, res) {
        try {
            const { id } = req.params
            const { category } = req
            const history = req.history
            await Category.findByIdAndUpdate(id, { ...category }, {new : true})
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    },
    async deleteCategory(req, res) {
        try {
            const { id } = req.params
            const history = req.history
            await Category.findByIdAndDelete(id)
                .then(data => showSuccess(res, data, history))
                .catch(e => showError(res, e.message))
        } catch (error) {
            showError(res, error.message)
        }
    }
}

module.exports = CategoryController