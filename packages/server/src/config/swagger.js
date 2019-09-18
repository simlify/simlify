const swaggerJSDoc = require('swagger-jsdoc');

module.exports = (app) => {
    const swaggerDefinition = {
        info: {
          title: 'Node Swagger API',
          version: '1.0.0',
          description: 'Swagger interface',
        },
        host: 'localhost:3000',
        basePath: '/',
    };
      
    // options for swagger jsdoc 
    const options = {
        swaggerDefinition: swaggerDefinition, // swagger definition
        apis: ['./packages/client-api/endpoints/**/*.route.js'], // path where API specification are written
    };
      
    // initialize swaggerJSDoc
    const swaggerSpec = swaggerJSDoc(options);
    const swaggerUi = require('swagger-ui-express')

    app.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}