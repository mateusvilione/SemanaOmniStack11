const connnection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const incidents = await connection('incidents').select('*');
    
        return response.json(incidents);
    },

    async store(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connnection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    }
};
