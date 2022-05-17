const User = require('../models/user')

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }
        })
    }
    else{
        return res.redirect('/users/signin');
    }
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
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user in signin page');
            return;
        }
        if(user){
            //verifying password
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            //if password dont match redirecting to sign in page
            return res.redirect('back');
        }
    })
}