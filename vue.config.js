module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ark.cn-beijing.volces.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
};