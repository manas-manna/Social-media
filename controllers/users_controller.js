const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_signup', {
        title: "Codeial | Sign Up"
    })
}

module.exports.signIn = function(req, res){
    return res.render('user_signin', {
        title: "Codeial | Sign In"
    })
}

//get the signUp data
module.exports.createUser= function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err, user){
        if(err){
            console.log('Error in finding the user in signup');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user')
                    return;
                }
                return res.redirect('/users/signin')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.CreateSession= function(req, res){
    //later
}