const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});

const userSingupSchema = new mongoose.Schema({
	firstname:{type:String, required:true, trim:true, maxLength:10},
	lastname :{type:String, required:true, trim:true, maxLength:10},
	email : {type:String, required:true, trim:true, unique:true},
	phone_number: {type:String, required:true, trim:true,unique:true, maxLength:10},
	password : {type:String, required:true, trim:true},
	role:{type:String, default:'user',enum:["user","landlord","admin"]},
	interested:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'property_interesteds'
        }] ,

})

module.exports = mongoose.model('userSingup',userSingupSchema)