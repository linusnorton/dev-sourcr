var path = require('path');

module.exports = {
    entry: './client/src/main.js',
    output: {
        path: './public/js',
        filename: 'main.min.js'
    },
    module: {
        loaders: [{ 
            test: path.join(__dirname, 'client'), 
            loader: 'babel-loader' 
        }]
    }
};