# PostCSS Rpx Loader [![Build Status][ci-img]][ci]

中文说明请见[README.zh-hans.md](https://github.com/vlev1n/postcss-rpx-loader/blob/master/README.zh-hans.md)

[PostCSS] plugin that makes you to use `rpx` (responsive px) unit in style sheets.

It may replace `rem` and `flexible.js` solution.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/vlev1n/postcss-rpx-loader.svg
[ci]:      https://travis-ci.org/vlev1n/postcss-rpx-loader

## Features

### Copy UI mark to code

Enables you to directly copy the `px` value in marked UI to your CSS (or other preprocessors), and the loader will compile them responsively without manually converting `px` values to `rem` or other units.

### Better performance

PostCSS will handle the unit conversion, and you needn't import any JS libs in the client. In other words, a better performance.

### No conflict with third-party UI libs

It doesn't depend on `<html data-dpr=""`, therefore, you won't get oversized or shrinked third-party UI lib.

### No overwriting exsiting units

Since `rpx` is a new unit, existing units like `rem`, `em` and `px` are not overwritten and work as what they originally does.

### VW core

It performs well on retina screens, and it well resolves real 1px problem, since the essence of `rpx` is `vw`.

## Usage (Take SCSS for example)

Ensure that you've installed [`postcss-loader`](https://www.npmjs.com/package/postcss-loader) and the PostCSS plugin of your preferred preprocessor.

Run `npm i postcss-rpx-loader -D` in the root directory of your project.

In `webpack.config.js`, invoke `postcss-loader`.

```js
module.exports = {
  module: {
    rules: [{
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'postcss-loader', // If you use a preprocessor，please insert `postcss-loader`before the loader of the preprocessor
      'sass-loader'
    ]
    }]
  }
}
```

Create `postcss.config.js` in the root directory of your project and write

```js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    // Default UI width is 750px
    require('postcss-rpx-loader')
    // May accept a parameter which indicates UI width
    // require('postcss-rpx-loader')(1080)
  ]
}
```

Now you can use `rpx` in your style sheets.

```css
div {
  /* If it is 50px in the marked UI, you just need to write 50rpx */
  height: 50rpx;  
}
```

```css
div {
  /* What you get */
  /* In devices with different screen widths, you will get uniform visual effects */
  height: 6.67vw;
}
```

## Integrate with Vue CLI

Run `npm i postcss-rpx-loader -D` in the root directory of your project.

In `package.json`

```json
{
  "name": "",
  "version": "",
  // ...
  "postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-rpx-loader": {} // Add this
    }
  }
}
```

<!-- ```js
postcss([ require('postcss-rpx-loader') ])
```

See [PostCSS] docs for examples for your environment. -->