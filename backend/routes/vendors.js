const express = require('express')
const multer  = require('multer')
const path = require('path')
const router = express.Router()

const { getProductById, getAllProductsNoLimit, deleteProduct, updateProduct, addProduct, getTotalProducts, uploadImageProduct, deleteImageProduct } = require('../controllers/ProductController')
const { validateProduct } = require('../validators/ValidateProduct')
const { getCategoryById, getAllCategories, deleteCategory, updateCategory, addCategory } = require('../controllers/CategoryController')
const { validateCategory } = require('../validators/ValidateCategory')
const { isLogged, isVendor } = require('../middlewares/Auth')
const { setHistory, getHistory } = require('../middlewares/History')

router.use('*', isLogged, isVendor)

const storage = (folder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/' + folder),
        filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
    })
}
const uploadProduct = multer({storage: storage('product')})
const upload = multer({storage: storage('product')})

// products
router.get(process.env.PRODUCT_ROUTE, getAllProductsNoLimit)
router.get(process.env.PRODUCT_ROUTE + '/total', getTotalProducts)
router.get(process.env.PRODUCT_ROUTE + '/id/:id', getProductById)
router.post(process.env.PRODUCT_ROUTE + '/upload/:id', uploadProduct.single('product'), uploadImageProduct)
router.post(process.env.PRODUCT_ROUTE + '/:id', validateProduct, setHistory('product', 'update'), updateProduct)
router.post(process.env.PRODUCT_ROUTE, validateProduct, setHistory('product', 'add'), addProduct)
router.delete(process.env.PRODUCT_ROUTE + '/img/:idProduct', deleteImageProduct)
router.delete(process.env.PRODUCT_ROUTE + '/:id', setHistory('product', 'delete'), deleteProduct)

// categories
router.get(process.env.CATEGORY_ROUTE, getAllCategories)
router.get(process.env.CATEGORY_ROUTE + '/:id', getCategoryById)
router.put(process.env.CATEGORY_ROUTE + '/:id', setHistory('category', 'delete'), deleteCategory)
router.post(process.env.CATEGORY_ROUTE + '/:id', setHistory('category', 'update'), validateCategory, updateCategory)
router.post(process.env.CATEGORY_ROUTE, setHistory('category', 'add'), validateCategory, addCategory)

// history
router.get('/history', getHistory)


module.exports = router