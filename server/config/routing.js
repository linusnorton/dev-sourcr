'use strict';

/**
 * Populate the app with the routes
 * 
 * @param {Express} app
 */
function addRoutes(app) {
    app.get('/', require('../controller/index/IndexController'));
    app.get('/oauth', require('../controller/oauth/OAuthController'));
    app.get('/search', require('../controller/search/SearchController'));
}

module.exports = { addRoutes: addRoutes };