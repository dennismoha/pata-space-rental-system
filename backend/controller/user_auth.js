const User = require('../model/users_singup');
const bcrypt = require('bcrypt');
// const {roles} = require('../roles')
const AccessControl = require('accesscontrol');
const ac = new AccessControl();


	ac.grant('user')
	  .readOwn('profile')
	  .updateOwn('profile')
	  .readAny('property')
	  .readAny('user')

	.grant('landlord')
	  .extend('user')
	  .readAny('profile')
	  .createOwn('property')
	  .deleteOwn('property')

	.grant('admin')
	  .extend('user')
	  .extend('landlord')
	  .updateAny('profile')
	  .deleteAny('profile')



const singup = (req,res) => {
	
	
	const {firstname, lastname,email,phone_number, password,password2} = req.body;
	let errors = [];

	if(!firstname || !lastname || !email || !phone_number || !password || !password2) {
		errors.push({message: "please fill in all the requirements"})
	}

	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(errors.length > 0) {
		res.render('register',{
			errors,firstname,lastname, email,phone_number, password, password2
		})
	} else {
		User.findOne({email:email})
		.then(user => {
			if(user)   {
				errors.push({message:"Email is arleady taken"});
				res.render('register',{
					errors,firstname, lastname,email,phone_number, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						firstname,
						lastname,						
						email,
						phone_number,
						role:req.body.role,
						password:hash
					});
					
					user.save().then(
						()=>{
							req.flash('success','your now registered! login')							
							 // res.redirect('/users/home_page')
							 console.log(user)
							 res.redirect('/page/')
							
						}).catch((error)=>{
							throw error
						})
				}).catch((error)=> {
					throw error
				})
			}
		})
	}
		
}

	//display all users in the database
	const allUsers = (req,res)=> {
		console.log(req.user)
		const permission = ac.can(req.user.role).readAny('profile');
		if(permission.granted) {
			User.find().then((users)=>{
			res.status(200).render('contact',{users})
		}).catch((error)=> {
			res.status(400).json({
				message: 'no user found'
			})
		})

		} else {
			res.status(403).end();
		}		
	}


	//getting one user 
const getUser =(req,res) => {	
	
		User.findById(req.params.id,(err,userFound)=> {
	 		if(err) {
	 			//use and error handler here
	 			res.status(400).json({message: "user not found"})
	 		}	

	 		if(userFound.role === "admin") {
	 			res.send('You cannot access this page')
	 		} else {
	 			res.render('Admin/users',{user:userFound })	 			
	 		}
	 		
	 	});
	
	 }

//updating a single user

const updateUser = (req,res) => {	
	const user =  new User({
		_id : req.params.id,
		firstname:req.body.firstname,
		lastname : req.body.lastname,
		email:req.body.email,
		phone_number:req.body.phone_number,
		role:req.body.role
	});

	User.updateOne({_id:req.params.id},user).then(
		()=>{
			res.send('user')
		}).catch((error)=>{
			throw error
		})

}



//deleting a single user
const deleteUser = (req, res) => {
	console.log(req.params)
	User.findByIdAndRemove(req.params.id,(err,removeUser)=> {
		if(err) {
			console.log('error deleting user');
			throw err
		}

			console.log('user successfully deleted')
			res.send('user removed successfully')
		// res.redirect('/')
	})
}



//editing user route




//logout module
const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/page');
}


module.exports = {singup,logout,allUsers,getUser,deleteUser,updateUser
				}
				 
				 