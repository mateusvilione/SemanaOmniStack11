const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const { page = 1 } = request.query;
        var count_pages;

        await connection('incidents')
            .count()
            .returning('count')
            .then(([count]) => count_pages=count.count);
            
        response.header('X-Total-Count', count_pages);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1 )* 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
    
        return response.json(incidents);
    },

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