const express = require('express')
const router = express.Router()
const { adminPage, addProfile, deleteProfile, details, deletePost, handleLogout } = require('../controllers/adminControllers')
const { loginPage, login, register } = require("../controllers/controllers")
const { userPage } = require("../controllers/userControllers")
const admin = require('./admin')
const session = require('express-session'); 



router.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get('/login', loginPage)
router.post("/login", login)
router.post("/register", register);

router.use((req, res, next) => {
    if (!req.session.email) {
        res.redirect('/login')
    } else {
        next()
    }
})

router.get('/', (req, res) => {
    res.send('Home')
})
router.get('/user', userPage);
router.get('/admin', adminPage)
router.post('/admin/add', addProfile)
router.get('/admin/:id/delete', deleteProfile);
router.get('/admin/:id/details', details)
router.get('/admin/:id/post/:profileId', deletePost)
router.get('/admin/logout', handleLogout)


module.exports = router