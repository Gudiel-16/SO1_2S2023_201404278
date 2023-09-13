import React, {useState, useEffect} from 'react'
import DivInput from '../components/DivInput';
import { GraphicPie } from '../components/GraphicPie';
import { getDataMonitoring } from '../services/monotoring.service';

const Monitoring = () => {

    const [ipGoAcutal, setIpGoAcutal] = useState(import.meta.env.VITE_IP_GO1);
    const [textSearch, setTextSearch] = useState('');
    const [dataGraphicRam, setDataGraphicRam] = useState([]);
    const [dataGraphicCpu, setDataGraphicCpu] = useState([]);

    useEffect( () => {
        // getDataModuls();
        const myInterval = setInterval( async () => {

            const res = await getDataMonitoring({ "ipGoAcutal": ipGoAcutal, "ipNode": import.meta.env.VITE_IP_GO1});
            let porc_cpu  = parseInt(res.data.data.Porcentaje_uso_cpu);
            let porc_ram = parseInt(res.data.data.Ram_data.Porcentaje_uso);
            setDataGraphicRam([porc_ram, 100-porc_ram]);
            setDataGraphicCpu([porc_cpu,100-porc_cpu]);

        }, 5000);

        return () => clearInterval(myInterval);
        
    }, [ipGoAcutal]);

    const getDataModuls = async () => {

        let porcentaje = Math.floor(Math.random() * 100);
        let porcentaje2 = Math.floor(Math.random() * 100);
        setDataGraphicRam([porcentaje,100-porcentaje]);
        setDataGraphicCpu([porcentaje2,100-porcentaje2]);

    }

    const updateValueAcutal = (e) => {
        if(e.target.value == 1){
            setIpGoAcutal(import.meta.env.VITE_IP_GO1);
        }else if (e.target.value == 2){
            setIpGoAcutal(import.meta.env.VITE_IP_GO2);
        }
    }

    const killProcess = () => {
        console.log("kill");
    }

    return (
        <div className='container-fluid'>

            <div className="row mt-5">
                <div className="col-md-4 offset-md-4">
                    <select className="form-select" aria-label="Default select example" onChange={updateValueAcutal}>
                        <option value="1">{import.meta.env.VITE_IP_GO1}</option>
                        <option value="2">{import.meta.env.VITE_IP_GO2}</option>
                    </select>
                </div>
            </div>

            <div className="row mt-4">
                    <div className="col-3 offset-3">
                        <GraphicPie datagraph = {dataGraphicRam} nameGraph = "RAM" />
                    </div>
                    <div className="col-3">
                        <GraphicPie datagraph = {dataGraphicCpu} nameGraph = "CPU" />
                    </div>
            </div>  

            <div className='row mt-5'>
                <div className='col-md-4 offset-md-4'>
                    <DivInput type='text' icon='fa-pen' value={textSearch} className='form-control' placeholder='Buscar...'
                            handleChange = { (e) => setTextSearch(e.target.value) } />
                </div>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid gap-2'>
                        <button className='btn btn-dark'>
                            <i className='fa-solid fa-magnifying-glass p-1'></i>
                            Buscar
                        </button>
                        <button className='btn btn-danger' onClick={killProcess}>
                            <i className='fa-solid fa-triangle-exclamation p-1'></i>
                            Kill
                        </button>
                    </div>
                </div>

                <div className="accordion mt-4" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">PID</th>
                                            <th scope="col">NOMBRE</th>
                                            <th scope="col">USUARIO</th>
                                            <th scope="col">ESTADO</th>
                                            <th scope="col">RAM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">PID1</th>
                                            <td>bash</td>
                                            <td>1000</td>
                                            <td>0</td>
                                            <td>1290</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">PID2</th>
                                            <td>bash</td>
                                            <td>1000</td>
                                            <td>0</td>
                                            <td>1290</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                

            </div>



        </div>

    )
}

export default Monitoring