const mongoose = require('mongoose');


const deleteSchema = new mongoose.Schema({
    dels:{type:Number},
    user : {type:String}


},{timestamps:true})

module.exports = mongoose.model('delete',deleteSchema);