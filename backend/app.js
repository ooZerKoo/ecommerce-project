require('dotenv').config()
require('./config/mongoose')
const createError = require('http-errors')
const express = require('express')

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_2.json');

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const usersRouter = require('./routes/users')
const vendorRouter = require('./routes/vendors')
const cartRouter = require('./routes/cart')

const cors = require('cors')

const app = express()


app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))
app.use(cookieParser())

app.use('/statics', express.static(path.join(__dirname, 'uploads')))

app.use(cors())
app.use(process.env.PRODUCT_ROUTE, productsRouter)
app.use(process.env.CATEGORY_ROUTE, categoriesRouter)
app.use(process.env.USER_ROUTE, usersRouter)
app.use(process.env.VENDOR_ROUTE, vendorRouter)
app.use(process.env.CART_ROUTE, cartRouter)
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

	// render the error page
	res.status(err.status || 500)
	res.send(err)
})

module.exports = app