/**
 * Zipkin-ui Webpack Dev Config
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-04
 *
 * Description : Webpack configuration for dev zipkin-ui builds.
 **/

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './static'
    }
});
