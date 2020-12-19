const express = require('express')
const router = express.Router()

const { startCart, getCart, addProductCart, removeProductCart, resetCart } = require('../controllers/CartController')

router.use('*', startCart)
router.post('/', getCart)
router.post('/add', addProductCart, getCart)
router.post('/reset', resetCart, getCart)
router.put('/:id', removeProductCart, getCart)

module.exports = router