const swaggerJSDoc = require('swagger-jsdoc');

module.exports = (app) => {
    const swaggerDefinition = {
        info: {
          title: 'Node Swagger API',
          version: '1.0.0',
          description: 'Swagger interface',
        },
        host: '',
        basePath: '/',
    };
      
    // options for swagger jsdoc 
    const options = {
        swaggerDefinition: swaggerDefinition, // swagger definition
        apis: [
            // route when executing npm start from main folder
            '../server/src/client-api/endpoints/**/*.route.js',
            // path if index.js from simlify folder is started
            './packages/server/src/client-api/endpoints/**/*.route.js'
        ],
    };

    // initialize swaggerJSDoc
    const swaggerSpec = swaggerJSDoc(options);
    const swaggerUi = require('swagger-ui-express')

    app.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}