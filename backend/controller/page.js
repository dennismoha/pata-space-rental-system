const User = require('../model/users_singup');
const About = require('../model/about')
const Category = require('../model/category')


//this is the landing page
const landing_page = (req,res) => {
	res.redirect('/property/property/user_landing_property_page')
}

//this is the signup pagesignup_page
const register_page = (req,res) => {
	res.render('home/register')
}

//this is the agent_signup pagesignup_page
const agent_register_page = (req,res) => {
	res.render('home/agent_register')
}

//this is the agent_signup pagesignup_page
const agency_register_page = (req,res) => {
	res.render('home/agency_register')
}


//this is the login page render
const login_page = (req,res) => {
	res.render('home/login')
}
//contact route
const contact_page =(req,res)=> {
	res.render('home/contact')
}
//about route
const home_about_page =(req,res)=> {
	About.find().then((about)=> {
		if(about) {
			res.render('home/about',{about:about})
		}else {
			throw error;
			console.log('unable to render home_page menu')
		}
	}).catch((error)=> {
		throw error
	})
}

//finding a user's profile
const dashboard_page =(req,res)=> {
	res.render('home/dashboard',{user:req.user})
}

const property_page = (req,res)=>{
	res.redirect('/property/property/user_property_page')
}

const admin_page = (req,res)=> {
	res.render('Admin/dashboard')
}

const admin_contactPage = (req,res) => {
	res.render('Admin/contact')
}

const admin_aboutPage = (req,res) => {
	res.render('Admin/about')
}

const about_page = (req,res) => {
	res.render('Admin/about')
}

const landlord_dashboard = (req,res) => {	
	res.render('landlord/landlord_dashboard');
}

const landlord_create_property = (req,res) => {
	var title,description,price,quantity,sold = "";
	Category.find().then((category)=> {
		if(category) {
			res.render('landlord/property_create',{category:category,title,description,price,quantity,sold});
		}
	}).catch((error)=> {
		throw error
	})
	
}

// const landlord_view_property = (req,res)=> {
// 	res.render('landlord/property_show')
// }

const add_category =(req,res) => {
	res.render('Admin/create_category')
}

const user_edit =(req,res) => {
	User.findById(req.params.id).then((userFound)=> {
		if(userFound) {			
			const userfound = Object.keys(userFound)
			res.render('Admin/user_edit',{userFound:userFound});
		}
	}).catch((error)=> {
		throw error;
		
	})


	
}
  
module.exports = {login_page,landing_page,register_page,contact_page,about_page,
	property_page,dashboard_page,admin_page,admin_contactPage,admin_aboutPage,home_about_page,
	landlord_dashboard,landlord_create_property,add_category,user_edit,agency_register_page,agent_register_page}
