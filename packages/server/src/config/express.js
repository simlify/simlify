const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    if(!app) app = express();

    app.use(morgan('combined'));

    app.options('*', cors());
    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    return app;
}