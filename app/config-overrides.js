const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = function override(config, env) {
    /*config.plugins[0] = new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
    })*/
    /*config.plugins[0].options.minify = {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    }*/
    config.plugins[0].options.minify.removeComments = false
    console.log(config.plugins[0].options)

    return config
}
