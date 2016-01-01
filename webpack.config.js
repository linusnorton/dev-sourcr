var webpack = require('webpack');

module.exports = {
    entry: './client/src/main.js',
    output: {
        path: './public/js',
        filename: 'main.min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-function-bind,plugins[]=syntax-function-bind,plugins[]=syntax-class-properties,plugins[]=transform-class-properties,plugins[]=transform-async-to-generator,plugins[]=syntax-object-rest-spread,plugins[]=transform-object-rest-spread' 
        }]
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         sourceMap: true
    //     })
    // ]
};
