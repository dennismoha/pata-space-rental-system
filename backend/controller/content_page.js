const about= require('../model/about');

const about_page = (req,res) => {

	const About = new about({
		 title: req.body.title,
		 content: req.body.content
	})

	About.save().then(
		(about)=>{
			res.send('about post saved')
		}).catch((error)=> {
			throw error
			console.log('error saving the about page content')
		})

	
}


module.exports = {about_page};

