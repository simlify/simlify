
module.exports = (commonData) => {
    const getNodeList = (req, res) => {
        const registry = commonData.nodeRegistry.serialize();
        res.send(registry);
    };

    const addNodeToFlow = (req, res) => {
        const {flowId, nodeName} = req.params;

        try {
            const flow = commonData.flows.getFlowById(flowId);
            const node = flow.addNode(nodeName);
            res.send(node.serialize());
        } catch(err) {
            res.status(400).send(err);
        }
    }

    const connectNodes = (req, res) => {
        const { flowId } = req.params;
        const {
            sourceNodeId,
            sourcePortId,
            targetNodeId,
            targetPortId,
        } = req.body;

        if (!sourceNodeId && !sourcePortId && !targetNodeId && !targetPortId) return res.status(400);

        const flow = commonData.flows.getFlowById(flowId);
        if (!flow) return res.status(404).send(`Flow with id ${flowId} could not be found`);

        const sourceNode = flow.getNodeWithId(sourceNodeId);
        const targetNode = flow.getNodeWithId(targetNodeId);

        try {
            const sourcePort = sourceNode.getPortById(sourcePortId);
            const targetPort = targetNode.getPortById(targetPortId);
            sourcePort.connectTo(targetPort);
            res.send('Successfully Connected');
        } catch(err) {
            res.status(400).send(err);
        }
    }

    return ({
        getNodeList,
        addNodeToFlow,
        connectNodes,
    })
}