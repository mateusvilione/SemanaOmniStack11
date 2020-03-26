const connection = require('../database/connection');

module.exports = {

    async store (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        var incident_id;

        await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        }).returning('id')
        .then(([id]) => incident_id=id);

        return response.json({ id: incident_id });
    },

    async index (request, response) {
        const incidents = await connection('incidents').select('*');
    
        return response.json(incidents);
    },



    async destroy (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted." });
        }
    
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
}