const mongoose = require('mongoose')
const { Schema } = mongoose
const gemSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Gem', gemSchema)
