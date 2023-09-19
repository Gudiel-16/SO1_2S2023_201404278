import axios from 'axios';

export const getDataMonitoring = async (data) =>
    await axios.post(data.ipNode + ":5001/api/node/moduls", { "url_golang": data.ipGoAcutal + ":5000/api/go/moduls" });

export const killPidService = async (data) => 
    await axios.post(data.ipNode + ":5001/api/node/process", { "url_golang": data.ipGoAcutal + ":5000/api/go/process", pid_pross: data.pid_pross });

export const stressCpuService = async (data) =>
    await axios.post(data.ipNode + ":5001/api/node/stress", { "url_golang": data.ipGoAcutal + ":5000/api/go/stress" });


// ANTES EN .jsx (error cors)
// import axios from 'axios';
// export const getDataMonitoring = async (ipGolang) => {
    
//     let urlGo = ipGolang + ":5000/api/go/moduls";

//     let res;
//     await axios.post(import.meta.env.VITE_IP_NODE, { "url_golang": urlGo })
//     .then( (response) => {
//         res = response.data;
//     })
//     .catch( (errors) => {
//         console.log(errors);
//     });

//     return res;
// }