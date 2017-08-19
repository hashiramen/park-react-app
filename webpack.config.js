'use strict';

const path = require('path');

module.exports = {
    entry: {
        client: ['babel-polyfill', './src/']
    },
    context: __dirname,
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
            }
        ]
    }
};
