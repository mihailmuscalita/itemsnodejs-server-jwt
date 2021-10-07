const config  = require('config');
const morgan  = require("morgan");
const helmet  = require("helmet");
const mongoose = require('mongoose');
const users = require('./routes/users');
const lists    = require('./routes/lists');
const auth     = require('./routes/auth');
const express = require("express");
const app     = express(); 

if(!config.get('jwtKey')){
        console.log("Private key not defined !");
        process.exit(1);
}

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/auth', auth);
app.use('/user', users);
app.use('/list', lists);

console.log("A new part has been started !");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000 ..."));

mongoose.connect('mongodb://localhost/test')
        .then(() => console.log("Connected to mongodb test!"))
        .catch(error => console.log(error));

