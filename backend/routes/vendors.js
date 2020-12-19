const express = require('express')
const router = express.Router()

// products
const { getProductById, getAllProducts, deleteProduct, updateProduct, addProduct } = require('../controllers/ProductController')
const { validateProduct } = require('../validators/ValidateProduct')

// categories
const { getCategoryById, getAllCategories, deleteCategory, updateCategory, addCategory } = require('../controllers/CategoryController')
const { validateCategory } = require('../validators/ValidateCategory')

// auth
const { isLogged, isVendor } = require('../middlewares/Auth')

// history
const { setHistory, getHistory } = require('../middlewares/History')

router.use('*', isLogged, isVendor)

// products
router.get('/product', getAllProducts)
router.get('/product/:id', getProductById)
router.put('/product/:id', setHistory('product', 'delete'), deleteProduct)
router.post('/product/:id', validateProduct, setHistory('product', 'update'), updateProduct)
router.post('/product', validateProduct, setHistory('product', 'add'), addProduct)

// categories
router.get('/category', getAllCategories)
router.get('/category/:id', getCategoryById)
router.put('/category/:id', setHistory('category', 'delete'), deleteCategory)
router.post('/category/:id', setHistory('category', 'update'), validateCategory, updateCategory)
router.post('/category', setHistory('category', 'add'), validateCategory, addCategory)

// history
router.get('/history', getHistory)


module.exports = router