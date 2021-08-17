module.exports = function override(config, env) {
    config.plugins[0].options.minify.removeComments = false
    config.optimization.minimize = false
    return config
}
