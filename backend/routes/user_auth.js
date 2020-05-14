const express = require('express');
const passport = require('passport');
const userRoute = express.Router();
const Usersign = require('../controller/user_auth');
const checkRole = require('../controller/checkroles');
const flash = require('connect-flash')




userRoute.post('/user/singup',Usersign.singup);

userRoute.post('/user/login',(req,res,next)=> {	
	passport.authenticate('local',{

		successRedirect : '/property/property/user_property_page',
		
		failureRedirect: '/page/users/login',
		failureFlash : true,
		successFlash : "welcome to the site"
	})(req,res,next);
});


userRoute.get('/users',  Usersign.allUsers);
userRoute.get('/users/getUser/:id',Usersign.getUser) //getting a single user


userRoute.delete('/users/removeUser/:id',Usersign.deleteUser) //removing a single user
 userRoute.put('/users/updateUser/:id',Usersign.updateUser) //updating a single user

userRoute.get('/users/logout',Usersign.logout);


module.exports = userRoute;





