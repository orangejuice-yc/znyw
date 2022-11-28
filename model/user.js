const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        dafault: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = userSchema