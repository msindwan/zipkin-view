/**
 * Zipkin-ui Webpack Dev Config
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-14
 *
 * Description : Webpack configuration for dev zipkin-ui builds.
 **/

const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './static',
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: process.env.ZIPKIN_API,
                secure: false
            }
        }
    }
});
