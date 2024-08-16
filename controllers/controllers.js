let bcrypt = require('bcryptjs');
const { User, Profile, Post, Comment } = require('../models/index');
const { where } = require('sequelize');


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
            const { email, password } = req.body;
            const find = await User.findOne({
                where: { email }
            });
    
            if (find) {
                if (bcrypt.compareSync(password, find.password)) {
                    req.session.email = find.email;
                    req.session.role = find.role;
                    
                    if (req.session.role === true) {
                        return res.redirect('/admin');
                    }
                    
                    return res.redirect('/user');
                } else {
                    return res.render('login', { errors: ['Incorrect password'] });
                }
            } else {
                return res.render('login', { errors: ['Email not found'] });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async register(req, res) {
        try {
            const { username, bio, profileImg, email, password } = req.body
            await User.create({ email, password })
            const userData = await User.findOne({
                where: {
                    email
                }
            });

            await Profile.create({ username, profileImg, UserId: userData.id, bio })

            res.redirect('/login')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(err => err.message);
                res.render('login', { errors });
              } else {
                res.status(500).send('Internal Server Error');
              }
        }
    }

    static async landingPage(req , res){
        try {
            
            let { search } = req.query;
            let whereCondition = {};
            
            if (search) {
                whereCondition = {
                    title: {
                        [Op.iLike]: `%${search}%`
                    }
                };
            }
            
            let post = await Post.findAll({
                where: whereCondition,
                include: [
                    {
                        model: Profile
                    }
                ]
            });

            // res.send(posting)
            // console.log(post)
            res.render('landingPage', { post })

            
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

}

module.exports = Controllers