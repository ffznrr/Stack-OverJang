const express = require('express');
const app = express()
const port = 3000
const { loginPage, login, register } = require("./controllers/controllers")
const { userPage } = require('./controllers/userControllers');
const session = require('express-session');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/login', loginPage)
app.post("/login", login)
app.post("/register", register);

app.use((req, res, next) => {
    if (!req.session.email) {
        res.redirect('/login')
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/user', userPage);

app.listen(port, () => {
    console.log('connect');
})