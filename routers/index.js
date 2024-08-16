const express = require('express')
const router = express.Router()
const { loginPage, login, register, landingPage } = require("../controllers/controllers")
const { renderProfile, mainPage, renderPost, handleComment, renderAddPost, renderOwnUser, renderOwnPost, renderEditOwnUser, handleEditOwnUser, handleDeletePost, handleAddPost, renderPostEdit, handleEditPost, handleLogoutUser } = require('../controllers/userControllers');
const { adminPage, addProfile, deleteProfile, details, deletePost, handleLogout } = require('../controllers/adminControllers')
const session = require('express-session');

router.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.get('/' , landingPage)

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

router.use('/admin', (req, res, next) => {
    if (!req.session.role || req.session.role !== true) {
        return res.status(403).send('Forbidden: You do not have access to this page');
    }
    next();
});

router.get('/admin', adminPage)
router.post('/admin/add', addProfile)
router.get('/admin/:id/delete', deleteProfile);
router.get('/admin/:id/details', details)
router.get('/admin/:id/post/:profileId', deletePost)
router.get('/admin/logout', handleLogout)

router.get('/user', mainPage);
router.get('/user/profile/:id' , renderProfile)
router.get('/user/post/:id' , renderPost)
router.post('/user/post/:id/comment' , handleComment)
router.get('/user/logout' , handleLogout) 
router.get('/user/:id' , renderOwnUser)
router.get('/user/:id/edit' , renderEditOwnUser)
router.post('/user/:id/edit' , handleEditOwnUser)
router.get('/user/:id/post' , renderOwnPost)
router.get('/user/:id/post/add' , renderAddPost)
router.post('/user/:id/post/add' , handleAddPost)
router.get('/user/:id/post/delete/:id' , handleDeletePost)
router.get('/user/:id/post/edit/:id' , renderPostEdit)
router.post('/user/:id/post/edit/:id' , handleEditPost)


module.exports = router