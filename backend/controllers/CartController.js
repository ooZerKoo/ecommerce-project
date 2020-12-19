const Product = require('../models/Product')
const { showSuccess, showError } = require('./MessageController')
const jwt = require('jsonwebtoken')
const { Cart } = require('../models/Cart')
const Category = require('../models/Category')

const CartController = {
    startCart(req, res, next) {
        var token = req.body.cartToken
        if (!token) {
            token = generateCartToken(new Cart())
        }
        setCart(req, token, next)
    },
    getCart(req, res) {
        showSuccess(res, {...req.cart, token: req.tokenCart})
    },
    async addProductCart(req, res, next) {
        try {
            const { id, quantity } = req.body
            const cart = new Cart(req.cart.products)
            console.log(id, quantity)
            const product = await Product.findById(id)

            if (!product)
                return showError(res, 5002)

            if (product.quantity <= quantity)
                return showError(res, 5003)

            const category = await Category.findById(product.category)

            const productCart = {
                _id: product._id,
                finalPrice: product.finalPrice,
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                discountType: product.discountType,
                symbol: product.symbol,
                url: category.url + '/' + product.url,
                category: category
            }
            cart.addProductCart(productCart, quantity)
            const token = generateCartToken(cart)
            setCart(req, token, next)
        } catch (error) {
            showError(res, error.message)
        }
    },
    removeProductCart(req, res, next) {
        const { id } = req.params
        const cart = new Cart(req.cart.products)
        cart.removeProductCart(id)
        const token = generateCartToken(cart)
        setCart(req, token, next)
    },
    resetCart(req, res) {
        const token = generateCartToken(new Cart())
        setCart(req, token, next)
    },
}


const setCart = (req, token, next) => {
    req.tokenCart = token
    req.cart = decodeCartToken(token)
    next()
}

const decodeCartToken = (token) => jwt.verify(token, process.env.KEY)

const generateCartToken = (cart) => jwt.sign({
        ...cart,
        iat: new Date().getTime(),
        exp: new Date().setSeconds(3600)
    },
    process.env.KEY
)

module.exports = CartController