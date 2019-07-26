# PostCSS Rpx Loader [![Build Status][ci-img]][ci]

[PostCSS]插件，可以让你在样式中使用响应式长度单位`rpx`，用法同微信小程序

可以取代`rem`和`flexible.js`等解决方案

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/vlev1n/postcss-rpx-loader.svg
[ci]:      https://travis-ci.org/vlev1n/postcss-rpx-loader

## 优点

### 照搬标注图

可以直接将UI标注图上的`px`值照搬到CSS（或SCSS等）中，插件会自动完成转换，无需手动换算为`rem`等单位

### 提高客户端性能

单位转换由PostCSS处理，无需在客户端引入任何JS库，从而提高性能

### 与组件库无冲突

不依赖`<html data-dpr="">`，引入第三方组件库后，不会导致其变大或变小

### 不覆盖原生单位

`rpx`是新增单位，不覆盖CSS原有单位如`rem`、`em`和`px`等，原有单位依然可以正常使用

### VW本质

由于本质上是`vw`，所以能够解决真实1px、视网膜屏幕等问题

## 使用方法（以SCSS为例）

首先确保安装了[`postcss-loader`](https://www.npmjs.com/package/postcss-loader)以及你所需的预处理器的PostCSS插件，如[`postcss-scss`](https://www.npmjs.com/package/postcss-scss)

在项目根目录中，执行`npm i postcss-rpx-loader -D`以安装本插件

在`webpack.config.js`中, 声明`postcss-loader`

```js
module.exports = {
  module: {
    rules: [{
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'postcss-loader', // 如果用了预处理器，将`postcss-loader`插入到预处理器的loader之前
      'sass-loader'
    ]
    }]
  }
}
```

在项目根目录下新建`postcss.config.js`，内容如下

```js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    // 默认UI图宽度为750px
    require('postcss-rpx-loader')
    // 可以接受一个参数，指定UI图宽度
    // require('postcss-rpx-loader')(1080)
  ]
}
```

接下来就可以在样式文件中使用`rpx`了

```css
div {
  /* 如果UI标注图上为50px，则只需要写50rpx */
  height: 50rpx;  
}
```

```css
div {
  /* 编译后结果 */
  /* 在不同宽度的设备上，视觉效果是一致的 */
  height: 6.67vw;
}
```

## 与Vue CLI集成

在项目根目录中，执行`npm i postcss-rpx-loader -D`以安装本插件

在`package.json`中

```json
{
  "name": "",
  "version": "",
  // 此处省略一万字
  "postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-rpx-loader": {} // 增加本行
    }
  }
}
```

<!-- ```js
postcss([ require('postcss-rpx-loader') ])
```

See [PostCSS] docs for examples for your environment. -->