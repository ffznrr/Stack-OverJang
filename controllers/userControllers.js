

class UserControllers{
    static async userPage(req,res){
        try{
        res.render('userpage')
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = UserControllers