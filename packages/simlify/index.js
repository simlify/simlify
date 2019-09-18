const client = require('@simlify/client');
const server = require('@simlify/server');
const express = require('express');

const app = express();

server.start(app)
  .then(() => {
    client.start(app);
    app.listen(8080);
})

