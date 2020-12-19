const express = require('express')
const router = express.Router()

const { getCategoryById, getAllCategories, getCategoryByUrl } = require('../controllers/CategoryController')
const { getProductsByCategoryId, getTotalProductsByCategoryId } = require('../controllers/ProductController')

router.get('/', getAllCategories)
router.get('/url/:url', getCategoryByUrl)
router.get('/:id', getCategoryById)
router.get('/:id/products', getProductsByCategoryId)
router.get('/:id/total', getTotalProductsByCategoryId)

module.exports = router