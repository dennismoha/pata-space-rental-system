const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});


const aboutSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:"No title"},
	content: {type:String, trim:true ,default:"about page content"}

})

module.exports = mongoose.model('about',aboutSchema);