const User = require('../model/users_singup');
const bcrypt = require('bcrypt')
const delProp = require('../model/property_delete');

//admin can create a new user
//admin can create a new landlord
//admin can operate crud operations on each person
//admin can see all users/landlords in the system

const createUser = (req,res) => {
	const {firstname, lastname,email,phone_number, password,password2,role} = req.body;
	let errors = [];

	if(!firstname || !lastname || !email || !phone_number || !password || !password2 || !role) {
		errors.push({message: "please fill in all the requirements"})
	}
	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(errors.length > 0) {
		res.render('Admin/createUser',{
			errors,firstname,lastname, email,phone_number, password, password2
		})
	} else {
		User.find({email:email, phone_number:phone_number})
		.then(user => {
			if(user.email || user.phone_number)   {
				errors.push({message:"email or phone_number arleady exists"});
				res.render('Admin/createUser',{
					errors,firstname, lastname,email,phone_number, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						firstname,
						lastname,						
						email,
						phone_number,
						password:hash,
						role
					});
					console.log('the user is',user)
					user.save().then(
						()=>{
							req.flash('success','User successfully added! login')							
							 // res.redirect('/users/home_page')
							 console.log(user)
							 res.redirect('/admin/admin/getUser')
							
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


const removeUser = (req,res) => {
	User.findByIdAndRemove(req.params.id,(err,user)=> {
		if(err) { 
			console.log('err removing the user')
			throw err
		}
		res.send('user successfully removed')
	})
}

//render admin reg form 

const regForm = (req,res) => {
	res.render('Admin/createUser')
}

//getting all the users;
const getUsers = (req,res) => {
	User.find().then(
		(user)=> {
			if(user) {
				res.render('Admin/all_users',{users:user})
			}
		}).catch((err)=> {
			throw err
		})
};

//getting all the deleted property names
const delProps = (req,res)=> {
	delProp.find().then((props)=> {
		if(props){
			res.render('Admin/delProps',{props:props})
		}
	}).catch((Error)=> {
		throw Error;
	})
}


module.exports = {createUser,getUsers,regForm,delProps};