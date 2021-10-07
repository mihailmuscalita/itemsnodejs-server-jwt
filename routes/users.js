const express = require('express');
const _       = require('lodash');
const bcrypt  = require('bcrypt');
const router  = express.Router();
const mongoose = require('mongoose');
const { User, validate } = require('../model/user');

router.post("/", async (request, response) => {

    const error = validate(request.body);
    if(error) return response.status(400).send(error.details[0].message); 

    let user = await User.findOne({email:request.body.email});
    if (user) return response.status(400).send('User registered !');

    user = new User({
        name : request.body.name,
        email: request.body.email,
        password:request.body.password
    });

    const salt    = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    response.header('auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports = router;