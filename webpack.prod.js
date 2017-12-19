/**
 * Zipkin-ui Webpack Prod Config
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-14
 *
 * Description : Webpack configuration for prod zipkin-ui builds.
 **/

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});
