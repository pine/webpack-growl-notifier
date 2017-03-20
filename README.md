# webpack-growl-notifier

[![Build Status](https://img.shields.io/travis/pine/webpack-growl-notifier.svg)](https://travis-ci.org/pine/webpack-growl-notifier)
[![npm Version](https://img.shields.io/npm/v/webpack-growl-notifier.svg)](https://www.npmjs.com/package/webpack-growl-notifier)

This is a [webpack](http://webpack.github.io/) plugin that uses the
[growly](https://github.com/theabraham/growly) package to
display build status system notifications to the user.

> This is a fork of the [webpack-notifier](https://github.com/Turbo87/webpack-notifier) plugin.
> I love Growl :heart:

The plugin will notify you about the first run (success/fail),
all failed runs and the first successful run after recovering from
a build failure. In other words: it will stay silent if everything
is fine with your build.


## Installation

Use `npm` to install this package:

    npm install --save-dev webpack-growl-notifier


## Usage

In the `webpack.config.js` file:

```js
var WebpackGrowlNotifierPlugin = require('webpack-growl-notifier');

var config = module.exports = {
  // ...

  plugins: [
    new WebpackGrowlNotifierPlugin(),
  ]
},
```


## Configuration

### Title

Title shown in the notification.

```js
new WebpackGrowlNotifierPlugin({title: 'Webpack'});
```

### Content Image

Image shown in the notification.

```js
var path = require('path');

new WebpackGrowlNotifierPlugin({contentImage: path.join(__dirname, 'logo.png')});
```

### Exclude Warnings

If set to `true`, warnings will not cause a notification.

```js
new WebpackGrowlNotifierPlugin({excludeWarnings: true});
```

### Always Notify

Trigger a notification every time.  Call it "noisy-mode".

```js
new WebpackGrowlNotifierPlugin({alwaysNotify: true});
```

### Skip Notification on the First Build

Do not notify on the first build.  This allows you to receive notifications on subsequent incremental builds without being notified on the initial build.

```js
new WebpackGrowlNotifierPlugin({skipFirstNotification: true});
```
