import axios from 'axios';

export const getRequest = async () =>
    await axios.get("http://localhost:5000/api/biblioteca");

export const createRequest = async (data) =>
    await axios.post("http://localhost:5000/api/biblioteca", data);