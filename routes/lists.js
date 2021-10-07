const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const config   = require('config');
const auth     = require('../middleware/auth');
const {List,validate} = require('../model/list');


router.get("/", auth, async (request,response) => {

    const error = validate(request.body);
    if(error) return response.status(400).send(error.details[0].message); 

    const token = request.header('auth-token');
    if(!token) return response.send(" No token available !");

    const lists = await List.find({user:request.user._id})
                            .populate('user','name');
    response.send(lists);

});

router.post("/", auth, async (request,response) => {
    const token = request.header('auth-token');
    if(!token) return response.send(" No token available !");

    let list = new List({
        name :request.body.name,
        items:request.body.items,
        user :request.user._id
    });

    await list.save();

    response.send(list);
});

router.put("/:id", auth, async (request,response) => {

    const token = request.header('auth-token');
    if(!token) return response.send(" No token available !");
    
    const list = await List.findById(request.params.id);
    if(!list) return response.send("Id not available !");

    list.set({
        name :request.body.name,
        items:request.body.items
    });

    const error = validate(list);
    if (error) return response.status(400).send(error.detail[0].message);

    await list.save();

    response.send(list);
});

router.delete("/:id", auth, async (request,response) =>{

    const token = request.header('auth-token');
    if(!token) return response.send(" No token available !");
    
    const list = await List.findById(request.params.id);
    if(!list) return response.send("Id not available !");

    await list.delete();

    response.send(request.params.id);

});

module.exports = router;