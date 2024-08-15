let bcrypt = require('bcryptjs');
const { User, Profile, Post, Comment } = require('../models/index')

class Controllers {
    static async loginPage(req, res) {
        try {

            const user = await User.findAll({
                include: Profile
            })

            res.render("login")
        } catch (err) {
            console.log(err);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const find = await User.findOne({
                where: {
                    email
                }
            })
            if (find) {
                if (bcrypt.compareSync(password, find.password)) {
                    req.session.email = find.email
                    if (find.role) {
                        res.redirect('/admin')
                    } else {
                        res.redirect('/userr')
                    }
                } else {
                    res.send('password salah')
                }
            } else {
                res.send('Email Tidak Ditemukan')
            }
        } catch (err) {
            console.log(err);
        }
    }
    static async register(req, res) {
        try {
            console.log(req.file);
            const { username, bio, profileImg, email, password } = req.body
            await User.create({ email, password })
            const userData = await User.findOne({
                where: {
                    email
                }
            });

            await Profile.create({ username, profileImg, UserId: userData.id, bio })
            res.redirect('/login')

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Controllers