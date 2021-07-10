const {home,login,login_post,signup,signup_post,create, create_post,showAll,edit,edit_post,delete_, delete_post,all} = require('../controller/user')
const express = require('express')
const app = express.Router()

app.get('/',home)
app.get('/login',login)
app.post('/login',login_post)
app.get('/signup',signup)
app.post('/signup',signup_post)
app.get('/create',create)
app.post('/create',create_post)
app.get('/showAll',showAll)
app.get('/edit',edit)
app.post('/edit',edit_post)
app.get('/delete',delete_)
app.post('/delete',delete_post)
app.all('*', all)


module.exports = app;
