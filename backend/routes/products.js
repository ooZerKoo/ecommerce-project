const express = require('express')
const router = express.Router()

const { getProductById, getAllProducts, getProductByUrl, searchProducts, getTotalProducts, updateProduct } = require('../controllers/ProductController')

router.get('/', getAllProducts)
router.get('/total', getTotalProducts)
router.post('/search', searchProducts)
router.get('/url/:url', getProductByUrl)
router.get('/id/:id', getProductById)

module.exports = router