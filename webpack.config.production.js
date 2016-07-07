var webpack = require("webpack");
var config = require("./webpack.config.base.js");

// Report first error as hard error
config.bail = true;
// Switch to debug mode
config.debug = false;
// Do not capture timing information for each module
config.profile = false;
// Emit source map
config.devtool = "#source-map";

config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false,
            screw_ie8: true
        }
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
]);

module.exports = config;
