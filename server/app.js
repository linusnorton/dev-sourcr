'use strict';

var express = require('express'),
    config = require('./config/express'),
    routing = require('./config/routing'),
    app = express();

config.setupExpress(app);
routing.addRoutes(app);

app.listen(app.get('port'), function() {
    console.log('Listening on port %d', app.get('port'));
});
