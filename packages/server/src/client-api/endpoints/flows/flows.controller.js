
module.exports = (commonData) => {
    const getAllFlows = (req, res) => {
        const allFlows = commonData.flows.getAllFlows();
        const allFlowsSerialized = allFlows.map((flow) => flow.serialize());
        res.send(allFlowsSerialized);
    };

    const updateFlow = (req, res) => {
        const updatedFlow = req.body;
        const currentFlow = commonData.flows.getFlowById(updatedFlow.id);
        currentFlow.stop();
        currentFlow.deserialize(updatedFlow);
        currentFlow.start();
        res.send(currentFlow.serialize());
    }

    const addFlow = (req, res) => {
        const flowDataSerialized = req.body;
        const addedFlow = commonData.flows.createNewFlow();
        if (flowDataSerialized) addedFlow.deserialize(flowDataSerialized);
        addedFlow.start();
        res.send(addedFlow.serialize());
    }

    return ({
        getAllFlows,
        updateFlow,
        addFlow,
    })
}