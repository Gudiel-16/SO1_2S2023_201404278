const axios = require('axios');
const { response } = require('../helpers/response.helper');

const stress_pc = async (req, res) => {
    try {

        const { url_golang } = req.body;
        
        const responseAxios = await axios.get(url_golang);

        response(res, 200, 'Stress realizado con exito.', responseAxios.data);

    } catch (error) {
        return response(res, 400, 'Error al realizar stress.', [error]);
    }
};

module.exports = { stress_pc };