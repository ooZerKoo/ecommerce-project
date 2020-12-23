const Category = require('../models/Category')

const { showError } = require('../controllers/MessageController')
const { isName, getCleanHtml, getUrl } = require('./ValidateData')

const ValidateCategory = {
    async validateCategory(req, res, next) {
        try {
            const id = req.params.id
            const { name, description, url, idParent } = req.body

            if (!isName(name))
                return showError(res, 2003)

            const urlCoded = getUrl(url)

            if (!id) {
                const checkUrl = await Category.findOne({
                    url: urlCoded
                })
                if (checkUrl)
                    return showError(res, 2005)
            } else {
                const checkUrl = await Category.findOne({
                    url: urlCoded,
                    _id: {
                        $ne: id
                    }
                })
                if (checkUrl)
                    return showError(res, 2005)
            }

            const category = {
                name: name,
                description: getCleanHtml(description),
                url: urlCoded,
                idParent: idParent,
            }
            req.category = category
            next()

        } catch (error) {
            showError(res, error.message)
        }
    },
}

module.exports = ValidateCategory