const { where, Op } = require('sequelize');
const { User, Profile, Post, Comment } = require('../models/index')

class UserControllers {
    static async mainPage(req, res) {
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
            
            let email = req.session.email;
            
            let user = await User.findOne({
                where: { email }
            });

            // res.send(posting)
            // console.log(post)
            res.render('user/postPage', { post , user })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async handleComment(req, res) {
        try {
            // console.log(req.body);
            const { comment, ProfileId, PostId } = req.body

            await Comment.create({
                comment, ProfileId, PostId
            })

            res.redirect('/user')
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async renderProfile(req, res) {
        try {
            const { id } = req.params

            let profile = await Profile.findOne({
                where: { id },
                include: Post
            })

            let email = req.session.email;
            
            let user = await User.findOne({
                where: { email }
            });
            // res.send(profile)
            res.render('user/profile', { profile , user })
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async renderPost(req, res) {
        try {
            // console.log(req.params);
            const {id} = req.params

            let post = await Post.findOne({
                where: { id },
                include: [
                  {
                    model: Profile,
                  },
                  {
                    model: Comment,
                    include: [
                      {
                        model: Profile,
                      },
                    ],
                  },
                ],
              });

            let email = req.session.email;

            // res.send(post)

            let user = await User.findOne({
                where: { email }
            })

            // res.send(post)
            res.render('user/postDetail' , {post , user})
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async handleComment(req , res){
        try {
            // console.log(req.body);
            // console.log(req.params);
            const {comment , ProfileId} = req.body
            const {id} = req.params

            await Comment.create({
                comment, ProfileId ,PostId: id
            })

            // console.log(req.body);
            // console.log(req.params);

            res.redirect(`/user/post/${id}`)

        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async renderAddPost(req , res){
        try {
            // console.log(req.params);
            const {id} = req.params

            res.render('user/addPost' , {id})
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async handleAddPost(req , res){
        try {
            // console.log(req.body);
            const {title , imageUrl , caption , ProfileId} = req.body

            await Post.create(
                {title , imageUrl , caption , ProfileId}
            )

            let email = req.session.email;

            let user = await User.findOne({
                where: { email }
            })

            res.redirect(`/user/${user.id}/post`)
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async renderOwnUser(req , res){
        try {
            const{id} = req.params

            let user = await Profile.findOne({
                where: {id}
            })

            // res.send(user)

            res.render('user/ownUser.ejs' , {user})
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async renderOwnPost(req , res){
        try {
            // console.log(req.params);

            const {id} = req.params

            let post = await Post.findAll({
                where: {ProfileId: id}
            })

            let email = req.session.email;

            let user = await User.findOne({
                where: { email }
            })

            res.render('user/ownPost' , {post , user})

        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async renderEditOwnUser(req , res){
        try {
            const{id} = req.params

            let user = await Profile.findOne({
                where: {id}
            })

            // res.send(user)

            res.render('user/editOwnUser.ejs' , {user})
        } catch (err) {
           console.log(err); 
           res.send(err)
        }
    }

    static async handleEditOwnUser(req , res){
        try {
            // console.log(req.params);
            // console.log(req.body);

            const { id } = req.params;
            const { bio, imageUrl } = req.body;
            
            await Profile.update(
              {
                bio,
                imageUrl
              },
              {
                where: {
                  id: id
                }
              }
            );

            res.redirect(`/user/${id}`)
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }

    static async handleDeletePost(req , res){
        try {
            // console.log(req.params);
            const {id} = req.params

            let email = req.session.email;

            let user = await User.findOne({
                where: { email }
            })

            await Post.destroy({
                where: {id}
            })

            res.redirect(`/user/${user.id}/post`)
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async renderPostEdit(req , res){
        try {
            // console.log(req.params);
            const {id} = req.params

            let post = await Post.findOne({
                where: {id}
            })

            let email = req.session.email;

            let user = await User.findOne({
                where: { email }
            })
      
            // res.send(post)

            res.render('user/editPost.ejs' , {post , user})
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async handleEditPost(req , res){
        try {
            // console.log(req.params);
            // console.log(req.body);

            const {id} = req.params
            const {title , imageUrl , caption , ProfileId} = req.body

            await Post.update(
                {title, imageUrl, caption},
                {
                    where: {id}
                }
            )

            res.redirect(`/user/${ProfileId}/post`)
        } catch (error) {
          console.log(error);  
          res.send(error)
        }
    }

    static async handleLogoutUser(req, res) {
        try {
            req.session.destroy(() => {
                res.redirect('/login')
            })

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserControllers