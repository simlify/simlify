const convertNode = (node) => {
    node.ports = node.ports.map((port) => ({
            id: port.name,
            label: port.label,
            value: port.value,
            portConnectedToPortId: port.portConnectedToPortId,
            portType: port.portType,
            direction: port.direction,
        })
    );
    const inputPorts = node.ports.filter((port) => port.direction ==='in');
    const outputPorts = node.ports.filter((port) => port.direction ==='out');
    
    return {
        id: node.id,
        name: node.name,
        options: node.options,
        inputPorts,
        outputPorts,
        positionX: node.x,
        positionY: node.y,
    }
}

const convertFlow = (serializedFlow) => {
    const { models: links } = serializedFlow.layers[0];
    const { models: nodes } = serializedFlow.layers[1];

    Object.values(links).forEach((link) => {
        const sourceNode = nodes[link.source];
        const targetNode = nodes[link.target];

        const sourcePort = sourceNode.ports.filter((port) => port.id === link.sourcePort)[0];
        const targetPort = targetNode.ports.filter((port) => port.id === link.targetPort)[0];

        sourcePort.portConnectedToPortId = targetPort.name;
        targetPort.portConnectedToPortId = sourcePort.name;
    });

    return {
        id: serializedFlow.id,
        name: serializedFlow.name,
        nodes: Object.values(nodes).map((node) => convertNode(node)),
    }
}

export default {
    convertFlow,
};