const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    age: {
        type: Number,
        required: [true, 'Please add age']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Please add an email']
    },
    phone: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)