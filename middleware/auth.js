const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(request, response, next){
    const token = request.header('auth-token');
    if (!token) return response.status(401).send('Acces denied ! No token available');
    try{
        const tokendecoded = jwt.verify(token, config.get('jwtKey'));
        request.user = tokendecoded;
        next();

    }catch(err){
        response.status(400).send("Invalid token !");
    }
}