'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

/**
 * Set up the basic express configuration, like port and views
 * 
 * @param {Express} app
 */
function setupExpress (app) {
    app.set('port', process.env.PORT || 8011);
    app.use(express.static(__dirname + '/../../public'));

    nunjucks.configure(__dirname + '/../../view/', {
        autoescape: true,
        express: app
    });

    app.use(cookieParser()) // required before session.
    app.use(session({
        secret: 'keyboard cat'    
    }));

}

module.exports = { setupExpress: setupExpress };