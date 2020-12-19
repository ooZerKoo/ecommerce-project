const mongoose = require('mongoose');

const HistroySchema = mongoose.Schema({
    type: String,
    user: String,
    id: String,
    action: String,
}, {
    timestamps: true
})

const History = mongoose.model('History', HistroySchema);

module.exports = History;