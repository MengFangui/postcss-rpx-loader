var postcss = require('postcss')

module.exports = postcss.plugin('postcss-rpx-loader', function(uiWidth) {
  uiWidth = uiWidth || 750
  if (uiWidth < 375 || uiWidth > 2160 || isNaN(uiWidth)) {
    console.error('Please check the uiWidth parameter. It should be a number between 375 and 2160')
    return
  } else {
    return function(root) {
      root.walkRules(function(rule) {
        rule.walkDecls(function(decl) {
          if (decl.value.includes('rpx')) {
            decl.value = decl.value.replace(/(\d+)(rpx)/g, (match, p1) => {
              const newP1 = (p1 / uiWidth * 100).toFixed(2)
              const newP2 = 'vw'
              return newP1 + newP2
            })
          }
        })
      })
    }
  }
})