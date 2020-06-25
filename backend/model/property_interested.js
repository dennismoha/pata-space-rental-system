//this table stores the number of likes for each user
//remember when removing a user to also include removing his data from this table

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});



const interestedSchema = new mongoose.Schema({
	interested: {type:Number,default:0},
	email: {
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'users_singup'
            },
            owner:String
        },
	property:{
		id:{
			 type:mongoose.Schema.Types.ObjectId,
                ref: 'property.js'
		},
		property:String
	}

})


module.exports = mongoose.model('intrested',interestedSchema)