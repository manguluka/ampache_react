var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssReporter = require("postcss-reporter");
var doiuse = require("doiuse");
var stylelint = require("stylelint");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var browsers = ["ie >= 9", "> 1%", "last 3 versions", "not op_mini all"];

module.exports = {
    entry: {
        "index": ["babel-polyfill", "bootstrap-loader", "./app/styles/common/index.js", "./index.js"],
        "fix.ie9": "./fix.ie9.js"
    },

    output: {
        path: path.join(__dirname, "app/dist/"),
        filename: "[name].js",
        publicPath: "./"
    },

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: "eslint-loader?{failOnError: true}",
                exclude: /node_modules/
            }
        ],
        loaders: [
            // Handle JS/JSX files
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    "cacheDirectory": ".cache/"
                },
                include: __dirname
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]" +
                    "!postcss-loader"
                )
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]" +
                    // TODO: "!postcss-loader" +
                    "!sass-loader"
                )
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=fonts/[name].[ext]"
            },
            {
                test: /\.(woff|woff2)$/,
                loader:"url?name=fonts/[name].[ext]&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?name=img/[name].[ext]&limit=10000&mimetype=image/svg+xml"
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin("style.css", { allChunks: true })
    ],

    postcss: [doiuse({ browsers: browsers }), stylelint, precss, autoprefixer({ browsers: browsers }), postcssReporter({ throwError: true, clearMessages: true })],

    resolve: {
        // Include empty string "" to resolve files by their explicit extension
        // (e.g. require("./somefile.ext")).
        // Include ".js", ".jsx" to resolve files by these implicit extensions
        // (e.g. require("underscore")).
        extensions: ["", ".js", ".jsx"],

        // Hack for isotope
        alias: {
            "masonry": "masonry-layout",
            "isotope": "isotope-layout"
        },
    }
};
