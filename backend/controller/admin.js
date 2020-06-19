const User = require('../model/users_singup');
const bcrypt = require('bcrypt')
const delProp = require('../model/property_delete');
const agentApproval = require('../model/Agent.js');
const nodemailer = require('nodemailer');

//admin can create a new user
//admin can create a new landlord
//admin can operate crud operations on each person
//admin can see all users/landlords in the system
//when a new landlord registers

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

// const agent_approval = (req,res)=> { //remember to sanitize this data using express validator
// 	const {firstname, lastname,email,phone_number, password,password2} = req.body;
// 	let errors = [];

// 	if(!firstname || !lastname || !email || !phone_number || !password || !password2) {
// 		errors.push({message: "please fill in all the requirements"})
// 	}

	
// 	if(password !== password2) {
// 		errors.push({message: "password do not match"})
// 	}

// 	if(password.length < 6) {
// 		errors.push({message: "password cannot be less than 6 characters"})
// 	}

// 	if(errors.length > 0) {
// 		res.render('register',{
// 			errors,firstname,lastname, email,phone_number, password, password2
// 		})
// 	} else {
// 		User.findOne({email:email}).then((user)=> {
// 			if(user) {
// 				errors.push({message:"User with that email exist"});
// 				res.render('home/agent_register',{
// 					errors,firstname, lastname,email,phone_number, password, password2
// 				})
// 			}else {
// 				agentApproval.findOne({email:email})
// 				.then(user => {
// 					if(user)   {
// 						errors.push({message:"Email is arleady taken"});
// 						res.render('home/agent_register',{
// 							errors,firstname, lastname,email,phone_number, password, password2
// 						})
// 					}else {
						
// 						bcrypt.hash(req.body.password, 10).then((hash)=> {
// 							const user = new agentApproval({
// 								firstname,
// 								lastname,						
// 								email,
// 								phone_number,
// 								role:req.body.role,						
// 								password:hash
// 							});
							
// 							user.save().then(
// 								()=>{
// 									req.flash('success','your now registered! login')							
// 									 // res.redirect('/users/home_page')
// 									 console.log(user,'your details have been received, waiting for approval');
// 									 res.redirect('/page/')
									
// 								}).catch((error)=>{
// 									throw error
// 								})
// 						}).catch((error)=> {
// 							throw error
// 						})
// 					}
// 				})

// 			}
// 		}).catch((errors)=>{
// 			throw errors;
// 		})

	
// 	}
// }


const agent_approval = (req,res)=> { //remember to sanitize this data using express validator
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
			User.findOne({email:email}).then((user)=> {
				if(user) {
					errors.push({message:"User with that email exist"});
					res.render('home/agent_register',{
						errors,firstname, lastname,email,phone_number, password, password2
					})
				}else {
					agentApproval.findOne({email:email})
					.then(user => {
						if(user)   {
							errors.push({message:"Email is arleady taken"});
							res.render('home/agent_register',{
								errors,firstname, lastname,email,phone_number, password, password2
							})
						}else {
							
							bcrypt.hash(req.body.password, 10).then((hash)=> {
								const user = new agentApproval({
									firstname,
									lastname,						
									email,
									phone_number,
									role:req.body.role,						
									password:hash
								});
								
								user.save().then(
									()=>{
										let mails = user.email;
										let transporter = nodemailer.createTransport({
											service : 'gmail',
											auth : {
												user: process.env.EMAIL,
												pass : process.env.PASSWORD
											}
										});
										
										let mailOptions = {
											from : "zarathustra254@gmail.com",
											to : mails,
											subject : "wait for your account to get approved",
											text : "Once your account is approved, you'll get an email to login"
										};
										
										transporter.sendMail(mailOptions,(err,data)=> {
											if(err) {
												console.log('error in mail sending ', err);
											}
												
										})
										
										errors.push({message:"Details received and waiting for approval"});
										console.log(user,'your details have been received, waiting for approval');
										res.render('home/agent_register',{errors})				
										 		 					 
										
									}).catch((error)=>{
										throw error
									})
							}).catch((error)=> {
								throw error
							})
						}
					})
	
				}
			}).catch((errors)=>{
				throw errors;
			})
	
		
		}
	}


const admin_Agentapprove_show = (req,res)=> {
	agentApproval.find().then((agent)=> {
		if(agent){
			res.render('Admin/Approvals/UnApprovedAgents',{agent})
		}
	}).catch((Error)=>{
		console.log('error getting all the registered users ',Error);
		throw Error;
	})
}

const Admin_show_single_unApprovedAgent = (req,res)=> {
	const id = req.params.id;
	agentApproval.findById(id).then((user)=> {
		if(user){
			user.password = undefined;
			res.render('Admin/Approvals/Agent_show', {user});
		}
	}).catch((error)=> {
		throw error;
	})
}

//sends an email to the user after account is approved
const Admin_approve = (req,res)=>{	
				  
	agentApproval.findByIdAndUpdate(req.params.id,{$set:{aprroved:'approved'}},{new:true}).then((user)=> {
		if(user) {
			const  firstname = user.firstname;
			const lastname = user.lastname;
			const email = user.email;
			const phone_number = user.phone_number;
			const role = user.role;
			password = user.password;
			console.log(firstname + " " + lastname + " " + email + phone_number + role + password ," is the first name")

			User.findOne({email:email}).then((userss)=>{
				if(userss) { //was for testing purposes but we can remove it here
					res.send('user was arleady approved')
				}
				const users = new User({
					firstname, 
					lastname, 
					email,
					phone_number,
					password,
					role,
				});
	
				users.save().then((newUser)=> {
					if(newUser) {
	
						let transporter = nodemailer.createTransport({
							service : 'gmail',
							auth : {
								user: process.env.EMAIL,
								pass : process.env.PASSWORD
							}
						});
	
						let mailOptions = {
							from : "zarathustra254@gmail.com",
							to : newUser.email,
							subject : "Account approved",
							text : "this is an email test and i hope it's going to work"
						};
	
						transporter.sendMail(mailOptions,(err,data)=> {
							if(err) {
								console.log('error in mail sending ', err);
							}
								
						})
	
						res.send('successfully sent mail')
					}
				}).catch((error)=>{
					throw error;
				})
			}).catch((error)=> {
				throw error;
			})
		
		}
	}).catch((error)=> {
		throw error;
	})

}

//route that disaproves an account
const Admin_disaprove = (req,res)=> {
	agentApproval.findByIdAndUpdate(req.params.id,{$set:{aprroved:'no'}},{new:true}).then((user)=> {
		if(user) {
			res.send(user)
		}
	}).catch((error)=>{
		throw error;
	})
}



module.exports = {createUser,getUsers,regForm,delProps,agent_approval,admin_Agentapprove_show,Admin_show_single_unApprovedAgent,Admin_approve
,Admin_disaprove};