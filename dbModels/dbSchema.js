const mongoose = require('mongoose')

const login_info = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required:true
    }, password: {
        type: String,
        required: true
    }, first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true
    }

})


const data = mongoose.model('blog_data', login_info)

module.exports = data