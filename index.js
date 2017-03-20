var stripANSI = require('strip-ansi');
var path = require('path');
var objectAssign = require('object-assign');
var growly = require('growly')

var DEFAULT_LOGO = path.join(__dirname, 'logo.png');

var WebpackGrowlNotifierPlugin = module.exports = function(options) {
    this.options = options || {};
    this.lastBuildSucceeded = false;
    this.isFirstBuild = true;
};

WebpackGrowlNotifierPlugin.prototype.compileMessage = function(stats) {
    if (this.isFirstBuild) {
        this.isFirstBuild = false;

        if (this.options.skipFirstNotification) {
            return;
        }
    }

    var error;
    if (stats.hasErrors()) {
        error = stats.compilation.errors[0];

    } else if (stats.hasWarnings() && !this.options.excludeWarnings) {
        error = stats.compilation.warnings[0];

    } else if (!this.lastBuildSucceeded || this.options.alwaysNotify) {
        this.lastBuildSucceeded = true;
        return 'Build successful';

    } else {
        return;
    }

    this.lastBuildSucceeded = false;

    var message;
    if (error.module && error.module.rawRequest)
        message = error.module.rawRequest + '\n';

    if (error.error)
        message = 'Error: ' + message + error.error.toString();
    else if (error.warning)
        message = 'Warning: ' + message + error.warning.toString();
    else if (error.message) {
        message = 'Warning: ' + message + error.message.toString();
    }

    return stripANSI(message);
};

WebpackGrowlNotifierPlugin.prototype.compilationDone = function(stats) {
    var msg = this.compileMessage(stats);
    if (msg) {
        var contentImage = ('contentImage' in this.options) ?
            this.options.contentImage : DEFAULT_LOGO;

        growly.notify(msg, objectAssign({
          title: 'Webpack',
          icon: contentImage,
        }, this.options))
    }
};

WebpackGrowlNotifierPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', this.compilationDone.bind(this));
};
