const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_app',{ useNewUrlParser: true ,useUnifiedTopology: true} ,(err)=>{
    if (err) throw err;
    console.log('connected');
})