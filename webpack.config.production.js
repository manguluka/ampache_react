var webpack = require("webpack");
var config = require("./webpack.config.base.js");

// Report first error as hard error
config.bail = true;
config.debug = false;
// Do not capture timing information for each module
config.profile = false;
// Emit source map
config.devtool = "#source-map";

config.plugins = config.plugins.concat([
    new webpack.NoErrorsPlugin(),  // Any error is considered a failure
    new webpack.DefinePlugin({  // Set production environment variable
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    // Optimizations
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    // Minifications
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false,
            screw_ie8: true
        }
    })
]);

module.exports = config;
