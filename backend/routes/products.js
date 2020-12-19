const express = require('express')
const router = express.Router()

const { getProductById, getAllProducts, getProductByUrl, searchProducts } = require('../controllers/ProductController')

router.get('/', getAllProducts)
router.post('/search', searchProducts)
router.get('/url/:url', getProductByUrl)
router.get('/:id', getProductById)

module.exports = router