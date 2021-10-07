const Joi      = require('joi');
const mongoose = require('mongoose');
const User     = require('./user');

const List = mongoose.model('List', new mongoose.Schema({
    name : 
    {
        type     :String,
        required :true,
        maxlength:20,
        minlength:2
    },
    items : [{type:String}],
    user  : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}));

function validateList(list){
    const schema ={
        name :Joi.string().min(2).max(20).required()
    }
}

exports.List     = List;
exports.validate = validateList;