const express = require('express');
const path = require('path');

const PORT = 8080;

module.exports = {
  start: (app) => {    
    if(!app) {
      app = express();
    }

    app.use(express.static(__dirname +'/dist/'));
    
    app.get('/app/*', (req, res) => {
        res.sendFile(path.join(__dirname+'/dist/index.html'));
      });

    return app;
  }
}

const args = process.argv.slice(2);
if(args[0] === 'standalone') {
  const app = module.exports.start()
  app.use('/api', (req, res) => {
    res.redirect(`http://localhost:3000${req.originalUrl}`);
  });
  app.listen(PORT, () => {
    console.log(`Server started and listening on Port ${PORT}`)
  });
}
