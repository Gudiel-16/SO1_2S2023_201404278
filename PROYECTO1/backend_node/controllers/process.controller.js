const axios = require('axios');
const { response } = require('../helpers/response.helper');

const kill_process = async (req, res) => {
    try {

        const { url_golang } = req.body;
        
        const responseAxios = await axios.get(url_golang);

        response(res, 200, 'Kill process realizado con exito', responseAxios.data);

    } catch (error) {
        return response(res, 400, 'Error al realizar kill process.', [error]);
    }
};

module.exports = { kill_process };