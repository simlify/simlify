 /**
 * @swagger
 * definitions:
 *   connectionParameter:
 *     type: object
 *     properties:
 *       sourceNodeId:
 *         type: string
 *       sourcePortId:
 *         type: string
 *       targetNodeId:
 *         type: string
 *       targetPortId:
 *         type: string
 */

module.exports = (server, commonData) => {
    const controller = require('./nodes.controller.js')(commonData);

    /**
    * @swagger
    * /api/v1/nodes/list:
    *   get:
    *     tags:
    *       - nodes
    *     description: A list of available nodes
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: An array containing all available nodes
    */
   
    server.get('/api/v1/nodes/list',
        controller.getNodeList);
    server.options('/api/v1/nodes/list');

    /**
    * @swagger
    * /api/v1/flows/{flowId}/nodes/add/{nodeName}:
    *   post:
    *     tags:
    *       - nodes
    *     description: Adding a new node to the given flow
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: flowId
    *         schema:
    *           type: string
    *         required: true
    *         description: Id of the flow the new node should be added to
	*       - in: path
    *         name: nodeName
    *         schema:
    *           type: string
    *         required: true
    *         description: Name of the node to be generated
    *     responses:
    *       200:
    *         description: An object containing all flows
    */
   
    server.post('/api/v1/flows/:flowId/nodes/add/:nodeName',
        controller.addNodeToFlow
    );
    server.options('/api/v1/flows/:flowId/nodes/add/:nodeName');

    /**
    * @swagger
    * /api/v1/flows/{flowId}/nodes/connect:
    *   post:
    *     tags:
    *       - nodes
    *     description: Connecting two nodes
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: flowId
    *         schema:
    *           type: string
    *         required: true
    *         description: Id of the flow where the nodes are located
	*       - name: connectionParameter
	*         description: Parameter for the connection between the nodes
	*         in: body
	*         require: true
	*         schema:
	*           $ref: '#/definitions/connectionParameter'
    *     responses:
    *       200:
    *         description: The two nodes are successfully connected
    */
   
    server.post('/api/v1/flows/:flowId/nodes/connect',
        controller.connectNodes
    );
    server.options('/api/v1/flows/:flowId/nodes/connect');

}