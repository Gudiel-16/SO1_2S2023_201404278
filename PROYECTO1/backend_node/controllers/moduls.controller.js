const axios = require('axios');
const performanceModel = require('../models/performance.model');
const { response } = require('../helpers/response.helper');


const read_moduls = async (req, res) => {
    try {

        const { url_golang } = req.body;
        
        const responseAxios = await axios.get(url_golang);
        const dataReturn = responseAxios.data;

        const params_uso_cpu_ram = {
            "uso_cpu": dataReturn.Porcentaje_uso_cpu,
            "uso_ram": dataReturn.Ram_data.Porcentaje_uso
        };

        performanceModel.insertPerformance(params_uso_cpu_ram, (errg, results) => {
            if (errg) return response(res, 400, 'Error al guardar datos de uso, cpu y ram', [errg]);

            performanceModel.readPerformance( (err, results) => {
                if (err) return response(res, 400, 'Error al obtener datos de uso, cpy y ram', [err]);

                let valuesRAM = [];
                let valuesCPU = [];
                let valuesLabel = [];

                results.forEach((res) => {
                    valuesRAM.push(res.uso_ram);
                    valuesCPU.push(res.uso_cpu);
                    valuesLabel.push(res.fecha);
                });

                dataReturn.RendimientoRam = valuesRAM;
                dataReturn.RendimientoCpu = valuesCPU;
                dataReturn.RendimientoLabel = valuesLabel;
    
                response(res, 200, 'Libro guardado con éxito.', dataReturn);
            });
        });

    } catch (error) {
        return response(res, 400, 'Error al obtener datos de modulos.', [error]);
    }
};

module.exports = { read_moduls };