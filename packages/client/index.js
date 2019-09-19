const express = require('express');
const path = require('path');

module.exports = {
  start: (app) => {
    let hasExternalServer = !!app;
    
    if(!app) {
      app = express();
    }

    app.use(express.static(__dirname +'/dist/'));
    
    app.get('/app/*', (req, res) => {
        res.sendFile(path.join(__dirname+'/dist/index.html'));
      });
    
    if(!hasExternalServer) {
      app.listen(8080);
    }
  }
}
