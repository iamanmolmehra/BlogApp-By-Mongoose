const db = require('../dbConnection/db');
const dbname = require('../dbModels/dbSchema')
const blog2 = require('../dbModels/created')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


exports.login = (req, res) => {
    res.render('login')
}

exports.home = (req, res) => {
    res.render('home')
}

exports.login_post = async (req, res) => {
    try {
        const result = await dbname.find({ email: req.body.email })
        console.log(result)
        const cmp = await bcrypt.compare(req.body.password, result[0].password)
        if (cmp) {
            const accesstoken = jwt.sign({"email":req.body.email }, 'siddik')
            res.cookie("jwt", accesstoken, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
            })
            res.render('home_page', { userData: result[0] });
        }
        else {

            res.send(`password is wrong <button style="font-size: 15px;" onclick="window.location.href='/login'">Go back</button>`)
        }

    }
    catch (err) {
        res.send(`User Not Found <button style="font-size: 15px;" onclick="window.location.href='/signup'">Click Here To Create An Account</button>`)
    }
}

exports.signup = (req, res) => {
    res.render('signup')
}

exports.signup_post = async (req, res) => {
    try {
        const resu = await dbname.find({ email: req.body.email })
        console.log(resu);
        console.log(resu.length >= 1)
        const pass = await bcrypt.hash(req.body.password, 10);
        if (resu.length >= 1) {
            res.send(`email already exists <button style="font-size: 15px;" onclick="window.location.href='/login'">Click Here To Go To THe Login Page</button>`` `)
        } else {
            user = {
                username: `${req.body.username}`,
                password: `${pass}`,
                first_name: `${req.body.first_name}`,
                last_name: `${req.body.last_name}`,
                email: `${req.body.email}`,
                phone: `${req.body.phone}`
            }
            const result = await dbname.insertMany(user)
            console.log(result)
            res.send(`You SuccessFully SignUp <button style="font-size: 15px;" onclick="window.location.href='/login'">Click Here To Login</button>`)
        }
    }
    catch (err) {
        console.log(err._message)
        res.send(`Please Fill All The Details <button style="font-size: 15px;" onclick="window.location.href='/signup'">Go Back</button>`)

    }
}


exports.create = (req, res) => {
    try {
        console.log(req.headers.cookie)
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) { return res.sendStatus(401).send('unAuthorized') }
        else {
            jwt.verify(token, 'siddik', (err, user) => {
                if (err) { return res.sendStatus(403).send('unAuthorized') }
                res.user = user
                res.render('create')
                next()
            })
        }
    } catch (err) {
        res.send(`unAuthorized <button style="font-size: 15px;" onclick="window.location.href='/login'">Login Again</button>`)
    }

}

exports.create_post = async (req, res) => {
    try {
        console.log(req.body)
        const resu = await blog2.find({ title: req.body.title })
        console.log(resu);
        console.log(resu.length >= 1)
        if (resu.length >= 1) {
            res.send(`title already used <button style="font-size: 15px;" onclick="window.location.href='/create'">Go Back</button>`)
        } else {
            user = {
                title: `${req.body.title}`,
                description: `${req.body.description}`
            }
            const result = await blog2.insertMany(user)
            console.log(result)
            res.send(`SuccessFully Created <button style="font-size: 15px;" onclick="window.location.href='/showall'">Show</button>`)
        }
    }
    catch (err) {
        console.log(err._message)
    }
}

exports.showAll = async (req, res) => {
    const resu = await blog2.find()
    console.log(resu);
    try {
        console.log(req.headers.cookie)
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) { return res.sendStatus(401).send('unAuthorized') }
        else {
            jwt.verify(token, 'siddik', (err, user) => {
                if (err) { return res.sendStatus(403).send('unAuthorized') }
                res.user = user
                res.render('showall', { userData: resu })
                next()
            })
        }
    } catch (err) {
        res.send(`unAuthorized <button style="font-size: 15px;" onclick="window.location.href='/login'">Login Again</button>`)

    }

}

exports.edit = async (req, res) => {
    const resu = await blog2.find()
    console.log(resu);
    console.log(req.headers.cookie)
    const authHeader = req.headers.cookie
    const token = authHeader.split('=')[1]
    if (token == null) { return res.sendStatus(401).send(`unAuthorized token is wrong <button style="font-size: 15px;" onclick="window.location.href='/login'">Login Again</button>`) }
    else {
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { return res.sendStatus(403).send(`unAuthorized <button style="font-size: 15px;" onclick="window.location.href='/login'">Login Again</button>`) }
            res.user = user
            res.render('edit', { Data: resu })
            next()
        })
    }

}

exports.edit_post = async (req, res) => {
    try {
        const resu = await blog2.updateMany({ title: req.body.title }, { $set: { description: req.body.description } })
        console.log(resu);
        if (resu.nModified === 1) {
            res.send(`Updated SuccessFully <button style="font-size: 15px;" onclick="window.location.href='/showall'">Show</button>`)

        } else {
            res.send(`Not Found <button style="font-size: 15px;" onclick="window.location.href='/edit'">Go Back</button>`)

        }

    }
    catch (err) {
        console.log(err)
    }
}

exports.delete_ = (req, res) => {
    try {
        console.log(req.headers.cookie)
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) { return res.sendStatus(401).send('unAuthorized') }
        else {
            jwt.verify(token, 'siddik', (err, user) => {
                if (err) { return res.sendStatus(403).send('unAuthorized') }
                res.user = user
                res.render('deleted')
                next()
            })
        }
    } catch (err) {
        res.send(`unAuthorized <button style="font-size: 15px;" onclick="window.location.href='/login'">Login Again</button>`)
    }
}

exports.delete_post = async (req, res) => {
    try {
        const resu = await blog2.deleteMany({ title: req.body.title })
        console.log(resu);
        if (resu.deletedCount === 1) {
            res.send(`deleted SuccessFully <button style="font-size: 15px;" onclick="window.location.href='/showall'">Show</button>`)

        } else {
            res.send(`Not Found <button style="font-size: 15px;" onclick="window.location.href='/delete'">Go Back</button>`)
        }
    }
    catch (err) {
        console.log(err)
    }

}

exports.all=(req,res)=>{
    res.send(`Url Not Found <button style="font-size: 15px;" onclick="window.location.href='/login'">Go Back</button>`)
}