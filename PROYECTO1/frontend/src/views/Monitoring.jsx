import React, {useState, useEffect} from 'react'
import DivInput from '../components/DivInput';
import { GraphicPie } from '../components/GraphicPie';
import { getDataMonitoring } from '../services/monotoring.service';

const Monitoring = () => {

    const [ipGoAcutal, setIpGoAcutal] = useState(import.meta.env.VITE_IP_GO1);
    const [textSearch, setTextSearch] = useState('');
    const [dataGraphicRam, setDataGraphicRam] = useState([]);
    const [dataGraphicCpu, setDataGraphicCpu] = useState([]);
    const [dataProcess, setDataProcess] = useState([]);
    const [dataProcessComplet, setDataProcessComplet] = useState([]);
    let cantidadProcesosMostrar = 25;

    useEffect( () => {
        getDataModuls();
        const myInterval = setInterval( async () => {

            getDataModuls();

        }, 10000);

        return () => clearInterval(myInterval);
        
    }, [ipGoAcutal,textSearch]);

    const getDataModuls = async () => {

        const res = await getDataMonitoring({ "ipGoAcutal": ipGoAcutal, "ipNode": import.meta.env.VITE_IP_NODE});
        let porc_cpu  = parseInt(res.data.data.Porcentaje_uso_cpu);
        let porc_ram = parseInt(res.data.data.Ram_data.Porcentaje_uso);
        setDataGraphicRam([porc_ram, 100-porc_ram]);
        setDataGraphicCpu([porc_cpu,100-porc_cpu]);

        // si no hay nada en el campo de busqueda
        if(textSearch == ""){
            // console.log("nouu",textSearch)
            if(res.data.data.Cpu_data.length >= cantidadProcesosMostrar){
                setDataProcess(res.data.data.Cpu_data.slice(0,cantidadProcesosMostrar));
                setDataProcessComplet(res.data.data.Cpu_data);
            }else{
                setDataProcess(res.data.data.Cpu_data);
            }   
        }else{
            // console.log("siuu ", textSearch)
            setDataProcessComplet(res.data.data.Cpu_data);
            const newPross = searchProcess(textSearch);
            setDataProcess(newPross);
        }

        // let porcentaje = Math.floor(Math.random() * 100);
        // let porcentaje2 = Math.floor(Math.random() * 100);
        // setDataGraphicRam([porcentaje,100-porcentaje]);
        // setDataGraphicCpu([porcentaje2,100-porcentaje2]);

    }

    const updateValueIPAcutal = (e) => {
        if(e.target.value == 1){
            setIpGoAcutal(import.meta.env.VITE_IP_GO1);
        }else if (e.target.value == 2){
            setIpGoAcutal(import.meta.env.VITE_IP_GO2);
        }
    }

    const changeSearch = (e) => {
        setTextSearch(e.target.value)
        const newProcess = searchProcess(e.target.value);
        setDataProcess(newProcess);
        console.log(e.target.value);
    }

    const searchProcess = (searchTerm) => {
        return dataProcessComplet.filter((pross) => {
            // si nombre proceso coincide
            if (pross.Nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
            }

            // si algun proceso hijo coincide
            if(pross.Hijos != null) {
                if(
                    pross.Hijos.some((proshijo) => proshijo.Nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                ) {
                    return true;
                }
            }
            
            // no hay coincidencia
            return false;
        });
    }

    const newSearch = () => {
        setTextSearch("");
        console.log("newSearch");
    }

    const killProcess = () => {
        console.log("kill");
        console.log(dataProcess);
    }

    return (
        <div className='container-fluid'>

            <div className="row mt-5">
                <div className="col-md-4 offset-md-4">
                    <select className="form-select" aria-label="Default select example" onChange={updateValueIPAcutal}>
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
                            handleChange = { changeSearch } />
                </div>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid gap-2'>
                        <button className='btn btn-dark' onClick={ newSearch }>
                            <i className='fa-solid fa-magnifying-glass p-1'></i>
                            Nueva busqueda
                        </button>
                        <button className='btn btn-danger' onClick={killProcess}>
                            <i className='fa-solid fa-triangle-exclamation p-1'></i>
                            Kill
                        </button>
                    </div>
                </div>

                <div className="accordion mt-4" id="accordionExample">
                    { 
                      dataProcess.map( (pross, i) => (
                        <div className="accordion-item" key={"a"+ i}>
                            <h2 className="accordion-header" id={"head" + pross.Pid_nombre}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + pross.Pid_nombre} aria-expanded="true" aria-controls={"collapse" + pross.Pid_nombre}>
                                    PID: {pross.Pid} ---- NOMBRE: {pross.Nombre} ---- USUARIO: {pross.Usuario} ---- RAM: {pross.Porcentaje_ram} ---- ESTADO: {pross.Estado}
                                </button>
                            </h2>
                            <div id={"collapse" + pross.Pid_nombre} className="accordion-collapse collapse" aria-labelledby={"head" + pross.Pid_nombre} data-bs-parent="#accordionExample">
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
                                        { 
                                            pross.Hijos!=null &&
                                            pross.Hijos.map( (prosschield, j) => (
                                                <tr key={"prosc"+j}>
                                                    <th scope="row">{prosschield.Pid}</th>
                                                    <td>{prosschield.Nombre}</td>
                                                    <td>{prosschield.Usuario}</td>
                                                    <td>{prosschield.Estado}</td>
                                                    <td>{prosschield.Porcentaje_ram}</td>
                                                </tr>
                                              ))                                         
                                        }
                                    </tbody>
                                </table>

                                </div>
                            </div>
                        </div>
                      )) 
                    }
                    
                </div>

            </div>

        </div>

    )
}

export default Monitoring