const sanitizeHtml = require('sanitize-html')

const ValidateDataController = {
    isEmail(data) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)
    },
    isNumber(data) {
        return !Number.isNaN(data)
    },
    getInteger(data) {
        return Number.parseInt(data)
    },
    isInteger(data) {
        return Number.isInteger(data)
    },
    getFloat(data) {
        return Number.parseFloat(data)
    },
    getCleanHtml(data) {
        return sanitizeHtml(data)
    },
    isName(data, len = 0) {
        return data.trim().length > len
    },
    getName(data) {
        return data.trim()
    },
    getUrl(data) {
        return data.trim().replace(/ /g, '-').toLowerCase()
    }
}

module.exports = ValidateDataController