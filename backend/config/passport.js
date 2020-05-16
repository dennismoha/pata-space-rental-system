const mongoose = require('mongoose');
const User = require('../model/users_singup');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = (passport)=> {
	passport.use(
			new localStrategy({usernameField:'email'},(email,password,done)=> {
				User.findOne({email:email})
				.then((user)=>{
					if(!user) {
						return done(null,false,{message:"Invalid user details"});
					}

					//match password
					bcrypt.compare(password,user.password,(err,isMatch)=>{
						if(err)  throw err;

						if(isMatch) {							
							return done(null, user);
						}else {
							
							return done(null, false, {message:"Invalid user details"})
							
						}
					})
				}).catch((error)=> {
					throw error
				})
			})
			)
		passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

}

