const getAllFlows = (commonData) => (req, res) => {
    const allFlows = commonData.flows.getAllFlows();
    const allFlowsSerialized = allFlows.map((flow) => flow.serialize());
    res.send(allFlowsSerialized);
};

const updateFlow = (commonData) => (req, res) => {
    const updatedFlow = req.body;
    const currentFlow = commonData.flows.getFlowById(updatedFlow.id);
    currentFlow.createNewIds();
    currentFlow.stop();
    currentFlow.deserialize(updatedFlow);
    currentFlow.start();
    res.send(currentFlow.serialize());
}

const addFlow = (commonData) => (req, res) => {
    const flowDataSerialized = req.body;
    const addedFlow = commonData.flows.createNewFlow();
    if (Object.entries(flowDataSerialized).length !== 0) {
        addedFlow.deserialize(flowDataSerialized);
        addedFlow.createNewIds();
    }
    addedFlow.start();
    res.send(addedFlow.serialize());
}

module.exports = {
    getAllFlows,
    updateFlow,
    addFlow,
}