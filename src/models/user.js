const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date
})

module.exports = model('User', userSchema)
