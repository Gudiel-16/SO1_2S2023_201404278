const axios = require('axios');
const { response } = require('../helpers/response.helper');


const read_moduls = async (req, res) => {
    try {

        const { url_golang } = req.body;
        
        const responseAxios = await axios.get(url_golang);

        response(res, 200, 'Datos de modulos obtenidos con exito', responseAxios.data);

    } catch (error) {
        return response(res, 400, 'Error al obtener modulos.', [error]);
    }
};

module.exports = { read_moduls };