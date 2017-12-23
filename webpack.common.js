/**
 * Copyright 2017 Mayank Sindwani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Zipkin-ui Webpack Common Config
 *
 * @Date : 2017-12-14
 * @Description : Webpack configuration for all zipkin-ui builds.
 **/

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});

module.exports = {
    context: __dirname + "/src",
    entry: [
        // Polyfill
        'babel-polyfill',
        // App
        './javascript/App.jsx',
        './sass/app.scss'
    ],

    output: {
        filename: "app.js",
        path: __dirname + "/static/dist",
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name:'fonts/[hash].[ext]'
                }
            }]
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name:'fonts/[hash].[ext]'
                }
            }]
        },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        extractSass,
        new WriteFilePlugin()
    ]
};
