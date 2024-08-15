const express = require('express');
const app = express()
const port = 3000
const { loginPage, login, register } = require("./controllers/controllers")
const { renderProfile, mainPage, renderPost, handleComment, renderAddPost, renderOwnUser, renderOwnPost, renderEditOwnUser, handleEditOwnUser, handleDeletePost, handleAddPost, renderPostEdit, handleEditPost } = require('./controllers/userControllers');
const session = require('express-session');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {
    res.send('Home')
})

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

app.get('/mainpage')

app.get('/user', mainPage);
app.get('/user/profile/:id' , renderProfile)
app.get('/user/post/:id' , renderPost)
app.post('/user/post/:id/comment' , handleComment)
app.get('/user/:id' , renderOwnUser)
app.get('/user/:id/edit' , renderEditOwnUser)
app.post('/user/:id/edit' , handleEditOwnUser)
app.get('/user/:id/post' , renderOwnPost)
app.get('/user/:id/post/add' , renderAddPost)
app.post('/user/:id/post/add' , handleAddPost)
app.get('/user/:id/post/delete/:id' , handleDeletePost)
app.get('/user/:id/post/edit/:id' , renderPostEdit)
app.post('/user/:id/post/edit/:id' , handleEditPost)

app.listen(port, () => {
    console.log('connect');
})