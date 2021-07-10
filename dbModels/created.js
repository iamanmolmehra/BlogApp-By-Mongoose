const mongoose = require('mongoose')

const blog = mongoose.Schema({
    title: {
        type: String,
        required:true
    }, description: {
        type: String,
        required: true
    }
})


const data2 = mongoose.model('post_data', blog)

module.exports = data2