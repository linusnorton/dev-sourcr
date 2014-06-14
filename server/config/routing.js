'use strict';

/**
 * Populate the app with the routes
 * 
 * @param {Express} app
 */
function addRoutes(app) {
    app.get('/', require('../controller/index/IndexController'));
    app.get('/oauth', require('../controller/auth/OAuthController'));
    app.get('/search', require('../controller/search/SearchController'));
    app.get('/sign-out', require('../controller/auth/SignOutController'));
}

module.exports = { addRoutes: addRoutes };