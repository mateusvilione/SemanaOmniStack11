const express = require('express');

const routes = express.Router();

routes.get('/user',(request, response) => {
    const params = request.query;
    
    return response.json({
        event: "Semana OmniStack 11.0",
        dev: params
    });
});

module.exports = routes;