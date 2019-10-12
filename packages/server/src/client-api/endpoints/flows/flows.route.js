module.exports = (server, commonData) => {
    const controller = require('./flows.controller.js');

    /**
    * @swagger
    * /api/v1/flows/all:
    *   get:
    *     tags:
    *       - flows
    *     description: Returns all flows with their attached nodes
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: An object containing all flows
    */
    server.get('/api/v1/flows/all',
        controller.getAllFlows(commonData));
    server.options('/api/v1/flows/all');

    /**
    * @swagger
    * /api/v1/flows:
    *   put:
    *     tags:
    *       - flows
    *     description: Updates the Flow
    *     produces:
    *       - application/json
    *     parameters:
	*       - name: updatedFlow
	*         description: Properties of the flow
	*         in: body
	*         require: true
    *     responses:
    *       200:
    *         description: The Flow was successfully updated
    */
    server.put('/api/v1/flows',
        controller.updateFlow(commonData));
    server.options('/api/v1/flows');

    /**
    * @swagger
    * /api/v1/flows:
    *   post:
    *     tags:
    *       - flows
    *     description: Creates a new Flow
    *     produces:
    *       - application/json
    *     parameters:
	*       - name: newFlow
	*         description: Properties of the new flow; will create new if empty
	*         in: body
	*         require: true
    *     responses:
    *       200:
    *         description: The Flow was successfully updated
    */
    server.post('/api/v1/flows',
        controller.addFlow(commonData));
    server.options('/api/v1/flows');

    /**
    * @swagger
    * /api/v1/flows/{flowId}:
    *   delete:
    *     tags:
    *       - flows
    *     description: Deletes a Flow
    *     produces:
    *       - application/json
    *     parameters:
	*       - name: flowId
	*         description: Id of the flow that will be deleted
    *         in: path
    *         schema:
    *           type: string
	*         require: true
    *     responses:
    *       200:
    *         description: The Flow was successfully deleted
    */
    server.delete('/api/v1/flows/:flowId',
        controller.deleteFlow(commonData));
    server.options('/api/v1/flows/:flowId');
}
