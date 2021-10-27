module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: true
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true
      },
      '/gallery': {
        target: 'http://localhost:8080/',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:8080/',
        changeOrigin: true
      }
    }
  },
  pwa: {
    name: 'SVK Meetup',
    themeColor: '#000000',
    msTileColor: '#FFFFFF',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  },
  /* 	pluginOptions: {} */
};