const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use('/',require('./router/route'))


app.listen(4000,()=>{
    console.log('server is running 4000')
})