const Product = require('../models/Product')

const {
    showError
} = require('../controllers/MessageController')
const {
    isName,
    isNumber,
    getCleanHtml,
    getInteger,
    getUrl,
    getFloat
} = require('./ValidateData')

const ValidateProduct = {
    async validateProduct(req, res, next) {
        try {
            const {
                id
            } = req.params
            const {
                name,
                description,
                price,
                discount,
                discountType,
                category,
                symbol,
                quantity,
                url
            } = req.body

            if (!isName(name))
                return showError(res, 2003)

            if (!isNumber(price))
                return showError(res, 2006)

            if (!isName(category))
                return showError(res, 2007)

            const urlCoded = getUrl(url)

            if (!id) {
                const checkUrl = await Product.findOne({
                    url: urlCoded
                })
                if (checkUrl)
                    return showError(res, 2005)
            } else {
                const checkUrl = await Product.findOne({
                    url: urlCoded,
                    _id: {
                        $ne: id
                    }
                })
                if (checkUrl)
                    return showError(res, 2005)
            }

            const product = {
                name: name,
                description: getCleanHtml(description),
                discount: getFloat(discount),
                discountType: discountType,
                symbol: symbol,
                quantity: getInteger(quantity),
                url: urlCoded
            }
            req.product = product
            next()

        } catch (error) {
            showError(res, error.message)
        }
    },
}

module.exports = ValidateProduct