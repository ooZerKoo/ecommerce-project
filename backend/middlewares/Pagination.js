const { getInteger } = require('../validators/ValidateData')

const Pagination = {
    getLimit(req) {
        var { limit } = req.query
        limit = limit ? getInteger(limit) : 12
        if (limit <= 0) limit = 12
        if (limit > 60) limit = 60
        return parseInt(limit)
    },
    getSkip(req) {
        limit = Pagination.getLimit(req)
        var { page } = req.query
        page = page ? getInteger(page) : 1
        page = (page - 1) * limit
        return page
    }
}

module.exports = Pagination