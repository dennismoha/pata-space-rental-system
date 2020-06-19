//this deals with all agents who have signed up via the registration button on the register page

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});

// const userSingupSchema = new mongoose.Schema({
//     firstname:{type:String, required:true, trim:true, maxLength:10},
//     middlename :{type:String, required:true, trim:true, maxLength:10},
// 	lastname :{type:String, required:true, trim:true, maxLength:10},
// 	email : {type:String, required:true, trim:true, unique:true},
// 	phone_number: {type:String, required:true, trim:true,unique:true, maxLength:10},
// 	password : {type:String, required:true, trim:true},
//     role:{type:String, default:'landlord'},
//     photo: {type:String,required:true},
//     Address : {type:String,required:true},
//     ID : {type:String,unique:true,max:30,min:8,required:true,trim:true},
//     aprroved:{type:String,default:'approved',enum:['approved','not aprroved']},
//     checktime:{type:String}

// })

const AgentSingupSchema = new mongoose.Schema({
	firstname:{type:String, required:true, trim:true, maxLength:10},
	lastname :{type:String, required:true, trim:true, maxLength:10},
	email : {type:String, required:true, trim:true, unique:true},
	phone_number: {type:String, required:true, trim:true,unique:true, maxLength:10},
	password : {type:String, required:true, trim:true},
    role:{type:String, default:'landlord'},
    aprroved:{type:String,default:'No',enum:['approved','No']}

})


module.exports = mongoose.model('AgentSingup',AgentSingupSchema)