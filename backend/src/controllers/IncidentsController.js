const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async list(request, response){
        const {page = 1 } = request.query;
        const [count] = await connection('incidents').count();
        console.log(count);
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select(['incidents.*', 'ongs.name', 'ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        console.log(request.headers);
        console.log(ong_id);
        //const id = crypto.randomBytes(4).toString('HEX');
        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
    console.log(result);
    const id = result[0];
    return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
      
        const  result = await connection('incidents')
        .select('ong_id')
        .where('id', id)
        .first();
        console.log(result);
        if (typeof result === 'undefined')
        {
            return response.status(404).json({ erro: 'Caso não localizado!'});
        }
        else if (result.ong_id !== ong_id )
        {
            return response.status(401).json({ erro: 'Você não está autorizado a excluir esse caso!'});
        }
        await connection('incidents').where('id',id).delete();
        return response.status(204).send();
    }
};
