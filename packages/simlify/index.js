const client = require('@simlify/client');
const server = require('@simlify/server');
const express = require('express');
const http = require('http');

const PORT = 8080;

const app = express();
const httpServer = http.Server(app);

server.start(app, httpServer)
  .then(() => {
    client.start(app);
    httpServer.listen(PORT, () => {
      console.log(`Application running on Port ${PORT}`);
    });
})
