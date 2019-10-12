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

const deleteRequest = async (url) => {
    const response = await axios.delete(url);
    return response.data;
};

export default {
    deleteFlow:  async (flowId) => await deleteRequest(`/api/v1/flows/${flowId}`),
    getAvailableNodes: async () => await getRequest('/api/v1/nodes/list'),
    getFlows: async () => await getRequest('/api/v1/flows/all'),
    putFlow: async (updatedFlow) => await putRequest('/api/v1/flows', updatedFlow),
    postFlow: async (newFlow) => await postRequest('/api/v1/flows', newFlow),
};