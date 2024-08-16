const { User, Profile, Post, Comment } = require('../models/index')

class AdminControllers {
    static async adminPage(req, res) {
        try {
            const profile = await Profile.findAll({
                include: User
            })
            res.render('admin/homeAdmin', { profile });
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async addProfile(req, res) {
        try {
            const { username, bio, profileImg, email, password } = req.body

            await User.create({ email, password })
            const userData = await User.findOne({
                where: {
                    email
                }
            });

            await Profile.create({ username, profileImg, UserId: userData.id, bio })

            res.redirect('/admin')
        } catch (err) {
            console.log(err);
        }
    }
    static async deleteProfile(req, res) {
        try {
            const { id } = req.params

            const data = await Profile.findOne({
                where: {
                    id
                }
            })

            await Profile.destroy({
                where: {
                    id
                }
            })

            await User.destroy({
                where: {
                    id
                }
            })

            res.redirect('/admin')
        } catch (err) {
            console.log(err);
        }
    }

    static async details(req, res) {
        try {
            const { id } = req.params
            const profile = await Profile.findOne({
                where: {
                    id
                },
                include: Post
            })
            res.render('admin/details', { profile })

        } catch (err) {
            console.log(err);
        }
    }

    static async deletePost(req, res) {
        try {
            const { id, profileId } = req.params
            await Post.destroy({
                where: {
                    id: profileId
                }
            })

            res.redirect(`/admin/${id}/details`)

        } catch (err) {
            console.log(err);
        }
    }

    static async handleLogout(req, res) {
        try {
            req.session.destroy(() => {
                res.redirect('/login')
            })

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = AdminControllers