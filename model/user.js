const config   = require('config');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi      = require('joi');

const userSchema = new mongoose.Schema({
    name   : 
    {
        type     :String,
        required :true,
        minlength:5,
        maxlength:70
    },
    email  : 
    {
        type     :String,
        required :true,
        minlength:5,
        maxlength:80
    },
    password :{
        type     :String,
        required :true,
        minlength:8,
        maxlength:200
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema ={
        name : Joi.string().min(5).max(70).required(),
        email: Joi.string().min(5).max(80).required(),
        password:Joi.string().min(8).max(200).required()
    }
}

exports.validate = validateUser;
exports.User = User;