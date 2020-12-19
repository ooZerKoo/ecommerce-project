const History = require('../models/History')
const { showError, showSuccess } = require('../controllers/MessageController')

const HistoryController = {
    setHistory: (type, action) => {
        return (req, res, next) => {
            req.history = {
                type: type,
                user: req.user._id,
                id: req.params.id,
                action: action
            }
            next()
        }
    },
    async getHistory(req, res) {
        try {
            const { search } = req.body
            History.find({ ...search })
                .then(r => showSuccess(res, r))
                .catch(e => showError(res, e.message))

        } catch (error) {
            showError(res, error.message)
        }
    }
}

module.exports = HistoryController