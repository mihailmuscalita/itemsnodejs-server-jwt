const express = require('express');
const router  = express.Router();

router.get("/",(request, response) =>{
    response.send("Router done!");
});

module.exports = router;