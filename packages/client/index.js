const express = require('express');
const path = require('path');

module.exports = {
  start: () => {
    const app = express();

    app.use(express.static(__dirname +'/dist/')); //serves the index.html
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/dist/index.html'));
      });
    
    app.listen(8080);
  }
}
