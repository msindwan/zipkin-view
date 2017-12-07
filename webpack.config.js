/**
 * Zipkin-ui Webpack Config
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-04
 *
 * Description : Webpack configuration for zipkin-ui.
 **/
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});

module.exports = {
     context: __dirname + "/src",
     entry: ['./javascript/App.jsx', './sass/app.scss'],

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
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }]
    },
    plugins: [
        extractSass
    ]
};
