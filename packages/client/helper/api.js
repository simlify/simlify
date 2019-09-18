import axios from "axios";

const getRequest = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

const postRequest = async (url, body) => {
    const response = await axios.post(url, body);
    return response.data;
};

const putRequest = async (url, body) => {
    const response = await axios.put(url, body);
    return response.data;
};

export default {
    getAvailableNodes: async () => await getRequest('http://localhost:3000/api/v1/nodes/list'),
    getFlows: async () => await getRequest('http://localhost:3000/api/v1/flows/all'),
    putFlow: async (updatedFlow) => await putRequest('http://localhost:3000/api/v1/flows', updatedFlow),
    postFlow: async (newFlow) => await postRequest('http://localhost:3000/api/v1/flows', newFlow),
};