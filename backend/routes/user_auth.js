const express = require('express');
const passport = require('passport');
const userRoute = express.Router();
const Usersign = require('../controller/user_auth');
const checkRole = require('../controller/checkroles');
const jwt = require('jsonwebtoken')



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
// userRoute.put('/users/updateUser/:id',function(req,res) {
// 	res.send('reached edit point')
// })

userRoute.delete('/users/removeUser/:id',Usersign.deleteUser) //removing a single user
 userRoute.put('/users/updateUser/:id',Usersign.updateUser)

userRoute.get('/users/logout',Usersign.logout);
userRoute.get('*',(req,res) => {
	res.send(req.body)
})

module.exports = userRoute;





