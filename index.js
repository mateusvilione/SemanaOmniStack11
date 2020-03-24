const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/user',(request, response) => {
    const params = request.query;
    
    return response.json({
        event: "Semana OmniStack 11.0",
        dev: params
    })
})

app.listen(process.env.PORT || 3333);